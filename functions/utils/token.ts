import type { Token } from "./types";

import { PublicError } from "./";

import { generateRandomString, isWithinExpiration } from "lucia/utils";

type GetToken = (
  db: D1Database,
  locale: string,
  contact: string,
  referrer: string,
  linkWith: string,
  previous_contact: string,
) => Promise<string>;

type ValidateToken = (
  db: D1Database,
  token: string,
  checkIfExpired?: boolean,
) => Promise<Token>;

type RemoveToken = (db: D1Database, token: string) => Promise<void>;

const EXPIRES_IN = 1000 * 60 * 60;

export const getToken: GetToken = async (
  db,
  locale,
  contact,
  referrer,
  linkWith = null,
  previous_contact = null,
) => {
  const { results: storedTokens } = await db
    .prepare(
      `SELECT * FROM verification_tokens WHERE locale = ? AND contact = ? AND referrer = ? AND link_with ${
        linkWith ? "=" : "IS"
      } ? AND previous_contact ${previous_contact ? "=" : "IS"} ?`,
    )
    .bind(locale, contact, referrer, linkWith, previous_contact)
    .all<Token>();

  const reusableToken = storedTokens.find(({ expires }) =>
    isWithinExpiration(expires - EXPIRES_IN / 2),
  );

  if (reusableToken) {
    const { id, expires } = reusableToken;

    if (isWithinExpiration(expires - EXPIRES_IN * (59 / 60))) {
      throw new PublicError("error_too_many_requests");
    }

    await db
      .prepare("UPDATE verification_tokens SET expires = ? WHERE id = ?")
      .bind(Date.now() + EXPIRES_IN, id)
      .all();

    return id;
  }

  const token = generateRandomString(64);

  await db
    .prepare("INSERT INTO verification_tokens VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(
      token,
      Date.now() + EXPIRES_IN,
      locale,
      contact,
      referrer,
      linkWith,
      previous_contact,
    )
    .all();

  return token;
};

export const validateToken: ValidateToken = async (
  db,
  token,
  checkIfExpired = true,
) => {
  if (!token) throw new Error("error_bad_request");

  const storedToken = await db
    .prepare("SELECT * FROM verification_tokens WHERE id = ?")
    .bind(token)
    .first<Token>();

  if (!storedToken) throw new Error("error_invalid_token");

  if (checkIfExpired && !isWithinExpiration(storedToken.expires))
    throw new Error("error_expired_token");

  return storedToken;
};

export const removeToken: RemoveToken = async (db, token) => {
  await db
    .prepare("DELETE FROM verification_tokens WHERE id = ?")
    .bind(token)
    .all();
};
