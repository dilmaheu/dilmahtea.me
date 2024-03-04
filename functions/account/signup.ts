import type { User } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";

import { removeToken, validateToken } from "../utils/token";
import { getProviderId, createSessionCookie } from "../utils";

import { initializeLucia } from "../utils/auth";
import fetchExactAccountWorker from "../utils/fetchExactAccountWorker";

const BodySchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
  token: z.string(),
});

type Body = z.infer<typeof BodySchema>;

export const onRequestPost: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const body = await request.json<Body>();

  try {
    var { first_name, last_name, token } = BodySchema.parse(body);

    var { locale, contact, referrer } = await validateToken(
      env.USERS,
      token,
      false,
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );
  }

  const auth = initializeLucia(env.USERS);

  const providerId = getProviderId(contact);

  const user: User = await auth.createUser({
    key: {
      providerId,
      providerUserId: contact,
      password: null,
    },
    attributes: {
      [providerId]: contact,
      first_name,
      last_name,
      display_name: `${first_name} ${last_name}`,
      locale,
    },
  });

  await removeToken(env.USERS, token);

  const FirstName = first_name,
    LastName = last_name,
    Language = locale;

  const ProviderId = providerId === "email" ? "Email" : "Phone";

  await fetchExactAccountWorker(
    "/account",
    "POST",
    {
      userId: user.userId,
      [ProviderId]: contact,
      FirstName,
      LastName,
      Language,
    },
    env,
  );

  const sessionCookie = await createSessionCookie(auth, user);

  return new Response(JSON.stringify({ success: true, referrer }), {
    headers: {
      "Set-Cookie": sessionCookie,
    },
  });
};
