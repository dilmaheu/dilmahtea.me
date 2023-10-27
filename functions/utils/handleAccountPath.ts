import type { Session } from "lucia";
import type { Token } from "./types";

import validator from "validator";
import { isWithinExpiration } from "lucia/utils";

import { initializeLucia } from "./auth";

export async function handleAccountPath(
  accountPath: RegExpMatchArray,
  URL: URL,
  USERS: D1Database,
  request: Request,
): Promise<Response | void> {
  const [fullMatch, specificPath] = accountPath,
    pathID = specificPath.replace(/(^\/|\/$)/g, "");

  const { origin } = URL,
    searchParams = Object.fromEntries(new URLSearchParams(URL.searchParams));

  const auth = initializeLucia(USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  if (session && pathID !== "congrats") {
    const referrer = request.headers.get("Referer") || origin;

    return Response.redirect(referrer, 303);
  }

  function redirectToLogin() {
    return Response.redirect(
      origin + fullMatch.replace(specificPath, "/login"),
      303,
    );
  }

  switch (pathID) {
    // redirect to login page if request is invalid
    case "verification": {
      const { contact, referrer } = searchParams;

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

      return redirectToLogin();
    }

    case "signup":
    case "link": {
      const { token, email, phone } = searchParams;

      if (token && (email || phone)) {
        const { results: storedTokens } = await USERS.prepare(
          "SELECT * FROM verification_tokens WHERE id = ?",
        )
          .bind(token)
          .all<Token>();

        if (storedTokens.length > 0) {
          const validToken = storedTokens.find(({ contact }) => {
            const isEmail = validator.isEmail(contact);

            return email ? isEmail : !isEmail;
          });

          if (validToken) break;
        }
      }

      return redirectToLogin();
    }

    default:
      break;
  }
}
