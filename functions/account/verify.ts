import type { Key, User } from "lucia";
import type { ENV } from "../utils/types";

import validator from "validator";

import { createSessionCookie } from "../utils";
import { initializeLucia } from "../utils/auth";
import { removeToken, validateToken } from "../utils/token";

export const onRequestGet: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const requestURL = new URL(request.url),
    { origin, searchParams } = requestURL;

  const token = searchParams.get("token");

  try {
    var storedToken = await validateToken(env.USERS, token);
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }

  const { locale, contact, referrer } = storedToken;

  const auth = initializeLucia(env.USERS);

  try {
    var key: Key = await auth.useKey("magic_link", contact.toLowerCase(), null);
  } catch (error) {
    if (error.message === "AUTH_INVALID_KEY_ID") {
      const isEmail = validator.isEmail(contact);

      const queryParams = new URLSearchParams({
        token,
        [isEmail ? "email" : "phone"]: "true",
      }).toString();

      return Response.redirect(
        origin + "/" + locale + "/account/signup?" + queryParams,
        303,
      );
    }

    throw error;
  }

  const user: User = await auth.getUser(key.userId);

  const sessionCookie = await createSessionCookie(auth, user);

  await removeToken(env.USERS, token);

  return new Response(null, {
    headers: {
      Location: referrer,
      "Set-Cookie": sessionCookie,
    },
    status: 303,
  });
};
