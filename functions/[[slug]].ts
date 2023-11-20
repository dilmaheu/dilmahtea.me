import type { Session } from "lucia";

import { parseCookie, serializeCookie } from "lucia/utils";

import { initializeLucia } from "./utils/auth";
import { handleAccountPath } from "./utils/handleAccountPath";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, passThroughOnException, next, env } = context;

  const requestURL = new URL(request.url),
    { pathname } = requestURL;

  const accountPath = pathname.match(/^\/[^/]+\/account([^]+)/);

  if (!accountPath) {
    passThroughOnException();
  }

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  if (accountPath) {
    const redirectResponse = await handleAccountPath(
      accountPath,
      requestURL,
      env.USERS,
      request,
      session,
    );

    if (redirectResponse) return redirectResponse;
  }

  const parsedCookie = parseCookie(request.headers.get("Cookie") || "");

  const { country } = request.cf,
    isAuthenticated = String(!!session),
    cookie = Object.entries({ country, isAuthenticated });

  if (cookie.some(([name, value]) => parsedCookie[name] !== value)) {
    let response = await env.ASSETS.fetch(request.url);

    response = new Response(response.body, response);

    cookie.forEach(([name, value]) => {
      response.headers.append(
        "Set-Cookie",
        serializeCookie(name, value, { path: "/" }),
      );
    });

    return response;
  } else {
    return next();
  }
};
