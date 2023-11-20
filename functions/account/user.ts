import type { Session } from "lucia";

import { initializeLucia } from "functions/utils/auth";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  delete session.user.id;
  delete session.user.userId;

  return Response.json(session.user);
};
