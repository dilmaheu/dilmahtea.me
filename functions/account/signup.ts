import type { User } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";
import validator from "validator";

import { createSessionCookie } from "../utils";
import { initializeLucia } from "../utils/auth";
import { removeToken, validateToken } from "../utils/token";

const BodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
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

  const isEmail = validator.isEmail(contact);

  const auth = initializeLucia(env.USERS);

  const user: User = await auth.createUser({
    key: {
      providerId: "magic_link",
      providerUserId: contact.toLowerCase(),
      password: null,
    },
    attributes: {
      [isEmail ? "email" : "phone"]: contact.toLowerCase(),
      first_name,
      last_name,
      locale,
    },
  });

  await removeToken(env.USERS, token);

  const sessionCookie = await createSessionCookie(auth, user);

  return new Response(JSON.stringify({ success: true, referrer }), {
    headers: {
      "Set-Cookie": sessionCookie,
    },
  });
};
