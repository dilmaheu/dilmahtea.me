import type { Session } from "lucia";

import { initializeLucia } from "./utils/auth";
import { handleAccountPath } from "./utils/handleAccountPath";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, passThroughOnException, next, env } = context;

  passThroughOnException();

  const requestURL = new URL(request.url),
    { origin, pathname } = requestURL;

  const accountPath = pathname.match(/^\/[^/]+\/account([^]+)/);

  if (accountPath) {
    const auth = initializeLucia(env.USERS),
      authRequest = auth.handleRequest(request);

    const session: Session = await authRequest.validate();

    if (session) {
      const referrer = request.headers.get("Referer") || origin;

      return Response.redirect(referrer, 303);
    }

    const redirectResponse = await handleAccountPath(
      accountPath,
      requestURL,
      env.USERS,
    );

    if (redirectResponse) return redirectResponse;
  }

  const cookie = request.headers.get("Cookie") || "",
    countryCookie = `country=${request.cf.country}`,
    [existingCountryCookie] = cookie.match(/country=[^;]+(?=;|$)/) || [];

  if (existingCountryCookie !== countryCookie) {
    let response = await env.ASSETS.fetch(request.url);

    response = new Response(response.body, response);

    response.headers.set(
      "Set-Cookie",
      cookie
        ? existingCountryCookie
          ? cookie.replace(existingCountryCookie, countryCookie)
          : `${cookie}; ${countryCookie}`
        : countryCookie,
    );

    return response;
  } else {
    next();
  }
};
