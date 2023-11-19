import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { d1 } from "@lucia-auth/adapter-sqlite";

export const initializeLucia = (db: D1Database) => {
  const auth = lucia({
    env: "PROD",
    middleware: web(),
    sessionCookie: {
      expires: false,
    },
    adapter: d1(db, {
      user: "user",
      key: "user_key",
      session: "user_session",
    }),
    getUserAttributes: (databaseUser) => databaseUser,
  });

  return auth;
};

export type Auth = ReturnType<typeof initializeLucia>;
