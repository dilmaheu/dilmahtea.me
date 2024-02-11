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

  const {
    exact_account_guid,
    default_delivery_address,
    default_billing_address,
  } = session.user;

  const { results: addresses } = await env.USERS.prepare(
    "SELECT * FROM addresses WHERE exact_account_guid = ?",
  )
    .bind(exact_account_guid)
    .all<Address>();

  return Response.json(
    [
      addresses.find((address, i) => {
        const isDefaultDeliveryAddress =
          default_delivery_address === address.id;

        if (isDefaultDeliveryAddress) {
          delete addresses[i];

          return isDefaultDeliveryAddress;
        }
      }),
      addresses.find((address, i) => {
        const isDefaultBillingAddress = default_billing_address === address.id;

        if (isDefaultBillingAddress) {
          delete addresses[i];

          return isDefaultBillingAddress;
        }
      }),
      ...addresses.map((address) => address.id),
    ].filter(Boolean),
  );
};
