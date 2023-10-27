import { handleAccountPath } from "./utils/handleAccountPath";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, passThroughOnException, next, env } = context;

  passThroughOnException();

  const requestURL = new URL(request.url);

  const accountPath = requestURL.pathname.match(/^\/[^/]+\/account([^]+)/);

  if (accountPath) {
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
