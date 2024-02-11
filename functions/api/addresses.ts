import type { Session } from "lucia";
import type { Address } from "@solid/Address";

import { z } from "zod";

import { initializeLucia } from "../utils/auth";

declare interface Env {
  USERS: D1Database;
}
const EditAddressBodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  street: z.string(),
  city: z.string(),
  postal_code: z.string(),
  country: z.string(),
  set_as_default_delivery_address: z.boolean().optional(),
  set_as_default_billing_address: z.boolean().optional(),
});

const AddAddressBodySchema = EditAddressBodySchema.extend({
  tag: z.string().optional(),
});

const UpdateAddressBodySchema = EditAddressBodySchema.extend({
  tag: z.string(),
});

const DeleteAddressBodySchema = z.object({
  id: z.string(),
});

type AddAddressBody = z.infer<typeof AddAddressBodySchema>;
type UpdateAddressBody = z.infer<typeof UpdateAddressBodySchema>;
type DeleteAddressBody = z.infer<typeof DeleteAddressBodySchema>;

declare type HandlerBody = (
  env: Env,
  session: Session,
  bodyData: any,
) => Promise<Response>;

function getAPIHandler(handlerBody: HandlerBody) {
  const handler: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    const auth = initializeLucia(env.USERS),
      authRequest = auth.handleRequest(request);

    const session: Session = await authRequest.validate();

    if (!session)
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );

    const bodyData = request.method === "GET" ? null : await request.json();

    try {
      const Schema =
        request.method === "POST"
          ? AddAddressBodySchema
          : request.method === "PUT"
            ? UpdateAddressBodySchema
            : request.method === "DELETE"
              ? DeleteAddressBodySchema
              : null;

      var validatedData = Schema?.parse(bodyData) || null;
    } catch (error) {
      return Response.json(
        { success: false, error: "Invalid address details" },
        { status: 400 },
      );
    }

    return await handlerBody(env, session, validatedData);
  };

  return handler;
}

export const onRequestGet: PagesFunction<Env> = getAPIHandler(
  async (env, session) => {
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
          const isDefaultBillingAddress =
            default_billing_address === address.id;

          if (isDefaultBillingAddress) {
            delete addresses[i];

            return isDefaultBillingAddress;
          }
        }),
        ...addresses.map((address) => address.id),
      ].filter(Boolean),
    );
  },
);

export const onRequestPost: PagesFunction<Env> = getAPIHandler(
  async (env, session, validatedData: AddAddressBody) => {
    const { exact_account_guid } = session.user;

    const { results: addresses } = await env.USERS.prepare(
      "SELECT * FROM addresses WHERE exact_account_guid = ?",
    )
      .bind(exact_account_guid)
      .all<Address>();

    const usedTags = addresses.map((address) => address.tag);

    if (usedTags.includes(validatedData.tag))
      return Response.json(
        { success: false, error: "Address tag already exists" },
        { status: 400 },
      );

    if (!validatedData.tag) {
      let latestCustomAddressTag = 0;

      for (const tag of usedTags) {
        if (tag.startsWith("Address #")) {
          const tagNumber = Number(tag.slice(9));

          if (tagNumber > latestCustomAddressTag)
            latestCustomAddressTag = tagNumber;
        }
      }

      validatedData.tag = `Address #${latestCustomAddressTag + 1}`;
    }

    if (usedTags.length === 0) {
      validatedData.set_as_default_delivery_address = true;
      validatedData.set_as_default_billing_address = true;
    }

    const id = crypto.randomUUID();

    await env.USERS.prepare(
      "INSERT INTO addresses (id, exact_account_guid, tag, first_name, last_name, street, city, postal_code, country, set_as_default_delivery_address, set_as_default_billing_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
      .bind(id, exact_account_guid, ...Object.values(validatedData))
      .run();

    return Response.json({ id });
  },
);

export const onRequestPut: PagesFunction<Env> = getAPIHandler(
  async (env, session, validatedData: UpdateAddressBody) => {
    const { exact_account_guid } = session.user;

    const { results: addresses } = await env.USERS.prepare(
      "SELECT * FROM addresses WHERE exact_account_guid = ?",
    )
      .bind(exact_account_guid)
      .all<Address>();

    const usedTags = addresses.map((address) => address.tag);

    if (!usedTags.includes(validatedData.tag))
      return Response.json(
        { success: false, error: "Address tag does not exist" },
        { status: 400 },
      );

    if (usedTags.length === 1) {
      validatedData.set_as_default_delivery_address = true;
      validatedData.set_as_default_billing_address = true;
    }

    await env.USERS.prepare(
      "UPDATE addresses SET first_name = ?, last_name = ?, street = ?, city = ?, postal_code = ?, country = ?, set_as_default_delivery_address = ?, set_as_default_billing_address = ? WHERE id = ?",
    )
      .bind(...Object.values(validatedData), validatedData.tag)
      .run();

    return Response.json({ success: true });
  },
);
