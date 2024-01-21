import type { User } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";

import { initializeLucia } from "../utils/auth";
import { removeToken, validateToken } from "../utils/token";
import { getProviderId, createSessionCookie } from "../utils";

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

  await env.EXACT_ACCOUNT.fetch(env.EXACT_ACCOUNT_WORKER_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-cf-secure-worker-token": env.CF_SECURE_WORKER_TOKEN,
    },
    body: JSON.stringify({
      userId: user.userId,
      [ProviderId]: contact,
      FirstName,
      LastName,
      Language,
    }),
  }).then((res) => res.json());

  const sessionCookie = await createSessionCookie(auth, user);

  return new Response(JSON.stringify({ success: true, referrer }), {
    headers: {
      "Set-Cookie": sessionCookie,
    },
  });
};
