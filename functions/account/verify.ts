import type { Key, User } from "lucia";
import type { ENV } from "../utils/types";

import { initializeLucia } from "../utils/auth";
import { removeToken, validateToken } from "../utils/token";
import { getProviderId, createSessionCookie } from "../utils";

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

  const { locale, contact, referrer, link_with } = storedToken;

  const auth = initializeLucia(env.USERS);

  const providerId = getProviderId(contact);

  try {
    var key: Key = await auth.useKey(providerId, contact.toLowerCase(), null);
  } catch (error) {
    if (error.message === "AUTH_INVALID_KEY_ID") {
      if (link_with) {
        return new Response("No user account exists with " + contact, {
          status: 400,
        });
      }

      const queryParams = new URLSearchParams({
        token,
        [providerId]: "true",
      }).toString();

      return Response.redirect(
        origin + "/" + locale + "/account/signup?" + queryParams,
        303,
      );
    }

    throw error;
  }

  const { userId } = key;

  if (link_with) {
    const providerId = getProviderId(link_with);

    await auth.createKey({
      userId,
      providerId,
      providerUserId: link_with.toLowerCase(),
      password: null,
    });

    await auth.updateUserAttributes(userId, {
      [providerId]: link_with.toLowerCase(),
    });
  }

  const user: User = await auth.getUser(userId);

  const sessionCookie = await createSessionCookie(auth, user);

  await removeToken(env.USERS, token);

  return new Response(null, {
    headers: {
      "Set-Cookie": sessionCookie,
      Location: referrer + (link_with ? "?linkedMobileAndEmail=true" : ""),
    },
    status: 303,
  });
};
