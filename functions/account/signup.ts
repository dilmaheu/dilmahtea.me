import type { User } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";

import formatNumber from "../utils/formatNumber";
import fetchExactAPI from "../utils/fetchExactAPI";

import { initializeLucia } from "../utils/auth";
import { removeToken, validateToken } from "../utils/token";
import { getProviderId, createSessionCookie } from "../utils";

const BodySchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  token: z.string(),
});

type Body = z.infer<typeof BodySchema>;

export const onRequestPost: PagesFunction<ENV> = async (context) => {
  const { request, env } = context;

  const body = await request.json<Body>();

  try {
    var { first_name, last_name, token } = BodySchema.parse(body);

    var { locale, contact, referrer } = await validateToken(
      env.USERS,
      token,
      false,
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Bad request" },
      { status: 400 },
    );
  }

  const auth = initializeLucia(env.USERS);

  const providerId = getProviderId(contact),
    ProviderId = providerId[0].toUpperCase() + providerId.slice(1);

  const user: User = await auth.createUser({
    key: {
      providerId,
      providerUserId: contact.toLowerCase(),
      password: null,
    },
    attributes: {
      [providerId]: contact.toLowerCase(),
      first_name,
      last_name,
      display_name: `${first_name} ${last_name}`,
      locale,
    },
  });

  const Name = first_name + " " + last_name,
    Language = locale;

  const ExistingCustomer = await fetchExactAPI(
    "GET",
    "/crm/Accounts?$select=ID,Name,Language,Email,Phone,Country&$filter=" +
      `${ProviderId} eq '${contact.toLowerCase()}'}`,
    env,
  ).then(({ feed }) => feed.entry?.content["m:properties"]);

  if (ExistingCustomer) {
    const alternateProviderId = providerId === "email" ? "phone" : "email",
      alternateProviderUserId =
        providerId === "email"
          ? ExistingCustomer["d:Phone"] &&
            formatNumber(
              ExistingCustomer["d:Phone"],
              ExistingCustomer["d:Country"],
            )
          : ExistingCustomer["d:Email"];

    if (alternateProviderUserId) {
      const { userId } = user;

      await auth.createKey({
        userId,
        providerId: alternateProviderId,
        providerUserId: alternateProviderUserId.toLowerCase(),
        password: null,
      });

      await auth.updateUserAttributes(userId, {
        [alternateProviderId]: alternateProviderUserId,
      });
    }

    if (
      ExistingCustomer["d:Name"] !== Name ||
      ExistingCustomer["d:Language"] !== Language
    ) {
      await fetchExactAPI(
        "PUT",
        `/crm/Accounts(guid'${ExistingCustomer["d:ID"]}')`,
        env,
        {
          Name,
          Language,
        },
      );
    }
  } else {
    const Customer = await fetchExactAPI("POST", "/crm/Accounts", env, {
      [ProviderId]: contact.toLowerCase(),
      Name,
      Language,
      Status: "C",
    });

    const customerID = Customer.entry.content["m:properties"]["d:ID"];

    await fetchExactAPI("POST", "/CRM/Contacts", env, {
      Account: customerID,
      FirstName: first_name,
      LastName: last_name,
      [ProviderId]: contact.toLowerCase(),
    });
  }

  await removeToken(env.USERS, token);

  const sessionCookie = await createSessionCookie(auth, user);

  return new Response(JSON.stringify({ success: true, referrer }), {
    headers: {
      "Set-Cookie": sessionCookie,
    },
  });
};
