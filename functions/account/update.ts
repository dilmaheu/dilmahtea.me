import type { Session } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";

import { initializeLucia } from "../utils/auth";

const BodySchema = z
  .object({
    display_name: z.string(),
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
    const { display_name, referrer } = BodySchema.parse(body);

    const { userId } = session.user;

    if (display_name) {
      await auth.updateUserAttributes(userId, { display_name });

      return Response.json({ success: true, referrer });
    }

    throw new Error();
  } catch (error) {
    return Response.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );
  }
};
