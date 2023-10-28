import type { Token } from "./types";

import { PublicError } from "./";

import { generateRandomString, isWithinExpiration } from "lucia/utils";

type GetToken = (
  db: D1Database,
  locale: string,
  contact: string,
  referrer: string,
  linkWith: string,
) => Promise<string>;

const EXPIRES_IN = 1000 * 60 * 60;

export const getToken: GetToken = async (
  db,
  locale,
  contact,
  referrer,
  linkWith = null,
) => {
  const { results: storedTokens } = await db
    .prepare(`SELECT * FROM verification_tokens WHERE contact = ?`)
    .bind(contact)
    .all<Token>();

  const reusableToken = storedTokens.find(({ expires }) =>
    isWithinExpiration(expires - EXPIRES_IN / 2),
  );

  if (reusableToken) {
    const { id, expires } = reusableToken;

    if (isWithinExpiration(expires - EXPIRES_IN * (59 / 60))) {
      throw new PublicError("Too many requests");
    }

    await db
      .prepare("UPDATE verification_tokens SET expires = ? WHERE id = ?")
      .bind(Date.now() + EXPIRES_IN, id)
      .all();

    return id;
  }

  const token = generateRandomString(64);

  await db
    .prepare("INSERT INTO verification_tokens VALUES (?, ?, ?, ?, ?, ?)")
    .bind(token, Date.now() + EXPIRES_IN, locale, contact, referrer, linkWith)
    .all();

  return token;
};

export async function validateToken(
  db: D1Database,
  token: string,
  checkIfExpired: boolean = true,
) {
  if (!token) throw new Error("Bad Request");

  const storedToken = await db
    .prepare("SELECT * FROM verification_tokens WHERE id = ?")
    .bind(token)
    .first<Token>();

  if (!storedToken) throw new Error("Invalid token");

  if (checkIfExpired && !isWithinExpiration(storedToken.expires))
    throw new Error("Expired token");

  return storedToken;
}

export async function removeToken(db: D1Database, token: string) {
  await db
    .prepare("DELETE FROM verification_tokens WHERE id = ?")
    .bind(token)
    .all();
}
