import type { Token } from "./types";

import { generateRandomString, isWithinExpiration } from "lucia/utils";

type GetToken = (
  db: D1Database,
  contact: string,
  referrer: string,
) => Promise<string>;

const EXPIRES_IN = 1000 * 60 * 60;

export const getToken: GetToken = async (db, contact, referrer) => {
  const { results: storedTokens } = await db
    .prepare(`SELECT * FROM verification_tokens WHERE contact = ?`)
    .bind(contact)
    .all<Token>();

  const reusableToken = storedTokens.find(({ expires }) =>
    isWithinExpiration(expires - EXPIRES_IN / 2),
  );

  if (reusableToken) return reusableToken.id;

  const token = generateRandomString(64);

  await db
    .prepare("INSERT INTO verification_tokens VALUES (?, ?, ?, ?)")
    .bind(token, Date.now() + EXPIRES_IN, contact, referrer)
    .all();

  return token;
};

export async function validateToken(db: D1Database, token: string) {
  const storedToken = await db
    .prepare("SELECT * FROM verification_tokens WHERE id = ?")
    .bind(token)
    .first<Token>();

  if (!storedToken) throw new Error("Invalid token");

  await db
    .prepare("DELETE FROM verification_tokens WHERE id = ?")
    .bind(token)
    .all();

  if (!isWithinExpiration(storedToken.expires))
    throw new Error("Expired token");

  return storedToken;
}
