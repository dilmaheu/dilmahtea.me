import type { Key, User } from "lucia";
import type { ENV } from "../utils/types";

import { isbot } from "isbot";

import { initializeLucia } from "../utils/auth";
import { removeToken, validateToken } from "../utils/token";
import { getProviderId, createSessionCookie } from "../utils";

import D1Strapi from "../utils/D1Strapi";
import fetchExactAccountWorker from "../utils/fetchExactAccountWorker";

export const onRequestGet: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const recurData = await D1Strapi.getSingle("recurringElement", context);

  const requestURL = new URL(request.url),
    { origin, searchParams } = requestURL;

  const userAgent = request.headers.get("User-Agent");

  if (isbot(userAgent))
    return Response.redirect(origin + "/account/login", 303);

  const token = searchParams.get("token");

  try {
    var storedToken = await validateToken(env.USERS, token);
  } catch (error) {
    return new Response(recurData[error.message] || error.message, {
      status: 400,
    });
  }

  const { locale, contact, referrer, link_with, previous_contact } =
    storedToken;

  const auth = initializeLucia(env.USERS);

  const providerId = getProviderId(contact);

  try {
    const [keyProviderId, keyProviderUserId] = previous_contact?.split(":") || [
      providerId,
      contact,
    ];

    var key: Key = await auth.useKey(keyProviderId, keyProviderUserId, null);
  } catch (error) {
    if (!previous_contact && error.message === "AUTH_INVALID_KEY_ID") {
      if (link_with) {
        return new Response(
          recurData.error_no_user_account_exists.replace("<contact>", contact),
          { status: 400 },
        );
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
      providerUserId: link_with,
      password: null,
    });

    await auth.updateUserAttributes(userId, {
      [providerId]: link_with,
    });
  }

  const user: User = await auth.getUser(userId);

  if (previous_contact) {
    const [previousProviderId, previousContact] = previous_contact.split(":");

    await auth.createKey({
      userId,
      providerId,
      providerUserId: contact,
      password: null,
    });

    await auth.updateUserAttributes(userId, {
      [providerId]: contact,
    });

    if (providerId === previousProviderId) {
      await auth.deleteKey(previousProviderId, previousContact);

      await auth.invalidateAllUserSessions(userId);
    }

    const ProviderId = providerId === "email" ? "Email" : "Phone";

    await fetchExactAccountWorker(
      "/account",
      "PUT",
      {
        ProviderId,
        contact,
        exact_account_guid: user.exact_account_guid,
        exact_contact_guid: user.exact_contact_guid,
      },
      env,
    );
  }

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
