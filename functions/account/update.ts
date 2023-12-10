import type { Session } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";
import { isMobilePhone } from "validator";

import { initializeLucia } from "../utils/auth";

const BodySchema = z
  .object({
    display_name: z.string(),
    email: z.string().email(),
    phone: z.string().refine(isMobilePhone),
    referrer: z.string(),
    token: z.string(),
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
    const parsedBody = BodySchema.parse(body),
      [property] = Object.keys(parsedBody),
      { display_name, email, phone, referrer, token } = parsedBody;

    const { userId } = session.user;

    switch (property) {
      case "display_name":
        await auth.updateUserAttributes(userId, {
          [property]: parsedBody[property],
        });

        break;
      case "email":
      case "phone":
        break;
      default:
        throw new Error();
    }

    return Response.json({ success: true, redirect: referrer });
  } catch (error) {
    return Response.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );
  }
};
