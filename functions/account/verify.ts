import { validateToken } from "../utils/token";

declare interface ENV {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const token = new URL(request.url).searchParams.get("token");

  if (!token) throw new Error("Bad Request");

  try {
    var storedToken = await validateToken(env.USERS, token);
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }

  const { referrer } = storedToken;

  return Response.redirect(referrer, 303);
};
