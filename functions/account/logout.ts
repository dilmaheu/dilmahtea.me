import type { Session } from "lucia";

import { initializeLucia } from "functions/utils/auth";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const auth = initializeLucia(env.USERS),
      authRequest = auth.handleRequest(request);

    const session: Session = await authRequest.validate();

    await auth.invalidateSession(session.sessionId);

    const sessionCookie = auth.createSessionCookie(null);

    return Response.json(
      { success: true },
      {
        headers: {
          "Set-Cookie": sessionCookie.serialize(),
        },
      },
    );
  } catch (error) {
    return Response.json({ success: false });
  }
};
