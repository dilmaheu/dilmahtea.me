import type { Session } from "lucia";
import type { Address } from "@solid/Address";

import { initializeLucia } from "../utils/auth";

declare interface Env {
  USERS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const auth = initializeLucia(env.USERS),
    authRequest = auth.handleRequest(request);

  const session: Session = await authRequest.validate();

  const { user } = session;

  delete user.id;
  delete user.userId;

  if (user.default_delivery_address) {
    user.default_delivery_address = await env.USERS.prepare(
      "SELECT * FROM addresses WHERE exact_account_guid = ?",
    )
      .bind(user.exact_account_guid)
      .first<Address>();
  }

  if (user.default_billing_address) {
    user.default_billing_address = await env.USERS.prepare(
      "SELECT * FROM addresses WHERE exact_account_guid = ?",
    )
      .bind(user.exact_account_guid)
      .first<Address>();
  }

  return Response.json(user);
};
