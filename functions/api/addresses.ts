import type { Session } from "lucia";
import type { Address } from "@solid/Address";

import type { ENV } from "../utils/types";

import { z } from "zod";
import objectHash from "object-hash";

import subset from "@utils/shared/subset";
import addressDetailsKeys from "@utils/shared/addressDetailsKeys";

import { initializeLucia } from "../utils/auth";

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
  id: z.string(),
  tag: z.string(),
});

const DeleteAddressBodySchema = z.object({
  id: z.string(),
});

type AddAddressBody = z.infer<typeof AddAddressBodySchema>;
type UpdateAddressBody = z.infer<typeof UpdateAddressBodySchema>;
type DeleteAddressBody = z.infer<typeof DeleteAddressBodySchema>;

declare type HandlerBody = (
  env: ENV,
  session: Session,
  bodyData: any,
) => Promise<Response>;

function getAPIHandler(handlerBody: HandlerBody) {
  const handler: PagesFunction<ENV> = async (context) => {
    const { request, env } = context;

    const auth = initializeLucia(env.USERS),
      authRequest = auth.handleRequest(request);

    const isGET = request.method === "GET";

    const session: Session = await authRequest.validate();

    if (!session)
      return Response.json(
        isGET ? [] : { success: false, error: "Unauthorized" },
        { status: isGET ? 200 : 401 },
      );

    const bodyData = isGET ? null : await request.json();

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

export const onRequestGet = getAPIHandler(async (env, session) => {
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

  const defaultDeliveryAddressIndex = addresses.findIndex(
      (address) => address.id === default_delivery_address,
    ),
    defaultBillingAddressIndex = addresses.findIndex(
      (address) => address.id === default_billing_address,
    );

  return Response.json(
    [
      addresses[defaultDeliveryAddressIndex],
      defaultDeliveryAddressIndex !== defaultBillingAddressIndex &&
        addresses[defaultBillingAddressIndex],
      ...addresses.filter(
        (_, i) =>
          ![defaultDeliveryAddressIndex, defaultBillingAddressIndex].includes(
            i,
          ),
      ),
    ].filter(Boolean),
  );
});

export const onRequestPost = getAPIHandler(
  async (env, session, validatedData: AddAddressBody) => {
    const { exact_account_guid } = session.user;

    let {
      tag,
      set_as_default_delivery_address,
      set_as_default_billing_address,
    } = validatedData;

    const { results: addresses } = await env.USERS.prepare(
      "SELECT * FROM addresses WHERE exact_account_guid = ?",
    )
      .bind(exact_account_guid)
      .all<Address>();

    const usedTags = addresses.map((address) => address.tag);

    if (usedTags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()))
      return Response.json(
        { success: false, message: "Address tag has been used already" },
        { status: 400 },
      );

    const addressHashes = structuredClone(addresses).map((address) => {
      return objectHash(subset(address, addressDetailsKeys));
    });

    const providedAddress = subset(validatedData, addressDetailsKeys);

    const providedAddressHash = objectHash(providedAddress);

    if (addressHashes.includes(providedAddressHash))
      return Response.json(
        { success: false, message: "Duplicate address provided" },
        { status: 400 },
      );

    if (!tag) {
      let latestCustomAddressTag = Math.max(
        0,
        ...usedTags
          .filter((usedTag) => usedTag.startsWith("Address #"))
          .map((usedTag) => Number(usedTag.slice(9))),
      );

      tag = `Address #${latestCustomAddressTag + 1}`;
    }

    if (usedTags.length === 0) {
      set_as_default_delivery_address = true;
      set_as_default_billing_address = true;
    }

    const id = crypto.randomUUID();

    await env.USERS.prepare(
      "INSERT INTO addresses (id, exact_account_guid, tag, first_name, last_name, street, city, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
      .bind(id, exact_account_guid, tag, ...Object.values(providedAddress))
      .run();

    if (set_as_default_delivery_address) {
      await env.USERS.prepare(
        "UPDATE user SET default_delivery_address = ? WHERE exact_account_guid = ?",
      )
        .bind(id, exact_account_guid)
        .run();
    }

    if (set_as_default_billing_address) {
      await env.USERS.prepare(
        "UPDATE user SET default_billing_address = ? WHERE exact_account_guid = ?",
      )
        .bind(id, exact_account_guid)
        .run();
    }

    return Response.json({ success: true });
  },
);

export const onRequestPut = getAPIHandler(
  async (env, session, validatedData: UpdateAddressBody) => {
    const { id, tag } = validatedData,
      {
        exact_account_guid,
        default_delivery_address,
        default_billing_address,
      } = session.user;

    let { set_as_default_delivery_address, set_as_default_billing_address } =
      validatedData;

    const { results: addresses } = await env.USERS.prepare(
      "SELECT * FROM addresses WHERE exact_account_guid = ?",
    )
      .bind(exact_account_guid)
      .all<Address>();

    const addressHashes = structuredClone(addresses).map((address) => {
      return objectHash(subset(address, addressDetailsKeys));
    });

    const providedAddress = subset(validatedData, addressDetailsKeys);

    const providedAddressHash = objectHash(providedAddress);

    let hasNothingToUpdate = true;

    if (!addressHashes.includes(providedAddressHash)) {
      hasNothingToUpdate = false;

      const existingAddress = addresses.find((address) => address.id === id);

      if (!existingAddress)
        return Response.json(
          { success: false, message: "Address does not exist" },
          { status: 400 },
        );

      if (tag !== existingAddress.tag) {
        const usedTags = addresses.map((address) => address.tag.toLowerCase());

        if (usedTags.includes(tag.toLowerCase()))
          return Response.json(
            { success: false, message: "Address tag has been used already" },
            { status: 400 },
          );
      }

      await env.USERS.prepare(
        "UPDATE addresses SET tag = ?, first_name = ?, last_name = ?, street = ?, city = ?, postal_code = ?, country = ? WHERE id = ?",
      )
        .bind(
          tag,
          ...Object.values(subset(validatedData, addressDetailsKeys)),
          id,
        )
        .run();
    }

    if (set_as_default_delivery_address && id !== default_delivery_address) {
      hasNothingToUpdate = false;

      await env.USERS.prepare(
        "UPDATE user SET default_delivery_address = ? WHERE exact_account_guid = ?",
      )
        .bind(id, exact_account_guid)
        .run();
    }

    if (set_as_default_billing_address && id !== default_billing_address) {
      hasNothingToUpdate = false;

      await env.USERS.prepare(
        "UPDATE user SET default_billing_address = ? WHERE exact_account_guid = ?",
      )
        .bind(id, exact_account_guid)
        .run();
    }

    if (hasNothingToUpdate)
      return Response.json(
        { success: false, message: "Nothing to update" },
        { status: 400 },
      );

    return Response.json({ success: true });
  },
);

export const onRequestDelete = getAPIHandler(
  async (env, session, validatedData: DeleteAddressBody) => {
    const { id } = validatedData,
      {
        exact_account_guid,
        default_delivery_address,
        default_billing_address,
      } = session.user;

    if (id === default_delivery_address)
      return Response.json(
        { success: false, message: "Cannot delete default delivery address" },
        { status: 400 },
      );

    try {
      await env.USERS.prepare("DELETE FROM addresses WHERE id = ?")
        .bind(id)
        .run();
    } catch (error) {
      return Response.json(
        { success: false, message: "Address does not exist" },
        { status: 400 },
      );
    }

    if (id === default_billing_address) {
      await env.USERS.prepare(
        "UPDATE user SET default_billing_address = ? WHERE exact_account_guid = ?",
      )
        .bind(default_delivery_address, exact_account_guid)
        .run();
    }

    return Response.json({ success: true });
  },
);
