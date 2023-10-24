import type { Token } from "./types";

import { isWithinExpiration } from "lucia/utils";

export async function handleAccountPath(
  accountPath: RegExpMatchArray,
  URL: URL,
  USERS: D1Database,
): Promise<Response | void> {
  const [fullMatch, specificPath] = accountPath,
    pathID = specificPath.replace(/(^\/|\/$)/g, "");

  switch (pathID) {
    // redirect to login page if request is invalid
    case "verification":
      const { origin, searchParams } = URL,
        contact = searchParams.get("contact"),
        referrer = searchParams.get("referrer");

      if (contact && referrer) {
        const { results: storedTokens } = await USERS.prepare(
          "SELECT * FROM verification_tokens WHERE contact = ? AND referrer = ?",
        )
          .bind(contact, referrer)
          .all<Token>();

        if (storedTokens.length > 0) {
          const usableToken = storedTokens.find(({ expires }) =>
            isWithinExpiration(expires),
          );

          if (usableToken) break;
        }
      }

      return Response.redirect(
        origin + fullMatch.replace(specificPath, "/login"),
        303,
      );

    default:
      break;
  }
}
