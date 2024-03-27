import type { Session } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";

import D1Strapi from "../utils/D1Strapi";
import { initializeLucia } from "../utils/auth";

const BodySchema = z
  .object({
    display_name: z.string(),
    kindness_cause: z.string(),
    referrer: z.string(),
  })
  .partial();

type Body = z.infer<typeof BodySchema>;

export const onRequestPost: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const recurData = await D1Strapi.getSingle("recurringElement", context);

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  if (!session) {
    return new Response(recurData.error_unauthorized, { status: 401 });
  }

  const body = await request.json<Body>();

  try {
    const { referrer, ...updatedAttributes } = BodySchema.parse(body);

    const { userId } = session.user;

    await auth.updateUserAttributes(userId, updatedAttributes);

    return Response.json({ success: true, referrer });
  } catch (error) {
    return Response.json(
      { success: false, message: recurData.error_bad_request },
      { status: 400 },
    );
  }
};
