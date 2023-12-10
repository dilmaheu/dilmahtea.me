import type { Session } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";
import { isMobilePhone } from "validator";

import { initializeLucia } from "../utils/auth";
import { checkUpdatedContact } from "../utils";

const BodySchema = z
  .object({
    display_name: z.string(),
    email: z.string().email(),
    phone: z.string().refine(isMobilePhone),
    updated_contact: z.string().refine(checkUpdatedContact),
    referrer: z.string(),
  })
  .partial();

type Body = z.infer<typeof BodySchema>;

export const onRequestPost: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json<Body>();

  try {
    const { display_name, email, phone, updated_contact, referrer } =
      BodySchema.parse(body);

    const { userId, locale } = session.user;

    if (display_name) {
      await auth.updateUserAttributes(userId, { display_name });

      return Response.json({ success: true, redirect: referrer });
    } else if (updated_contact) {
      return await fetch(
        new URL(request.url).origin + "/account/send-magic-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            email,
            phone,
            locale,
            referrer,
            updated_contact,
          }),
        },
      );
    }

    throw new Error();
  } catch (error) {
    return Response.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );
  }
};
