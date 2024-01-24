import type { Session } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";
import validator from "validator";
import { fromZodError } from "zod-validation-error";

import fetchExactAPI from "../utils/fetchExactAPI";
import getCustomerFilter from "../utils/getCustomerFilter";

import { initializeLucia } from "../utils/auth";
import { getToken, removeToken, validateToken } from "../utils/token";
import { PublicError, checkUpdatedContact, isMobilePhone } from "../utils";

const BaseSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .optional(),
  phone: z
    .string()
    .refine(isMobilePhone, { message: "Invalid phone number" })
    .refine((str) => isMobilePhone(str, true), {
      message: "Phone number must include a country code",
    })
    .optional(),
});

const BodySchema = BaseSchema.extend({
  action: z.literal("login"),
  locale: z.string(),
  referrer: z.string(),
})
  .or(
    BaseSchema.extend({
      action: z.literal("link"),
      token: z.string(),
    }),
  )
  .or(
    BaseSchema.extend({
      action: z.literal("update"),
      referrer: z.string(),
      previous_contact: z.string().refine(checkUpdatedContact),
    }),
  );

type Body = z.infer<typeof BodySchema>;

export const onRequestPost: PagesFunction<ENV> = async (context) => {
  const { request, env } = context,
    requestOrigin = new URL(request.url).origin;

  const body = await request.json<Body>();

  let email: string,
    phone: string,
    locale: string,
    referrer: string,
    linkWith: string,
    previous_contact: string;

  try {
    try {
      var bodyData = BodySchema.parse(body);
    } catch (error) {
      throw new PublicError(
        fromZodError(error)
          .toString()
          .replace(/^Validation error: | at "[\w]+"$/g, ""),
      );
    }

    switch (bodyData.action) {
      case "login":
        {
          ({ email, phone, locale, referrer } = bodyData);

          if (!referrer || new URL(referrer).origin !== requestOrigin) {
            referrer = requestOrigin;
          }
        }
        break;

      case "link":
        {
          const { token } = bodyData;

          try {
            ({
              locale,
              referrer,
              contact: linkWith,
            } = await validateToken(env.USERS, token, false));
          } catch (error) {
            throw new PublicError(error.message);
          }

          ({ email, phone } = bodyData);

          const isEmail = validator.isEmail(linkWith);

          if (!(email || phone) || (isEmail && email) || (!isEmail && phone)) {
            throw new PublicError("Bad request");
          }
        }
        break;

      case "update": {
        const auth = initializeLucia(env.USERS),
          authRequest = auth.handleRequest(request);

        const session: Session = await authRequest.validate();

        if (!session) throw new PublicError("Unauthorized");

        ({ email, phone, referrer, previous_contact } = bodyData);

        ({ locale } = session.user);

        // throw error if account with email or phone already exists
        const DuplicateAccountError = new PublicError(
          `The entered ${
            email ? "email address" : "phone number"
          } already exists. Please contact support at <a href="mailto:hello@dilmahtea.me">hello@dilmahtea.me</a>`,
        );

        const Customer = await fetchExactAPI(
          "GET",
          "/crm/Accounts?$filter=" + getCustomerFilter(email || phone, !!email),
          env,
        ).then(({ feed }) => feed.entry);

        if (Customer) throw DuplicateAccountError;

        try {
          await auth.getKey(email ? "email" : "phone", email || phone);
        } catch (error) {
          break;
        }

        throw DuplicateAccountError;
      }

      default:
        break;
    }
  } catch (error) {
    const isPublicError = error instanceof PublicError;

    return Response.json(
      {
        success: false,
        message: isPublicError ? error.message : "Something went wrong",
      },
      { status: 400 },
    );
  }

  const contact = email || phone;

  try {
    const token = await getToken(
      env.USERS,
      locale,
      contact,
      referrer,
      linkWith,
      previous_contact,
    );

    var magicLink =
      new URL(request.url).origin + "/account/verify/" + "?token=" + token;

    console.log(magicLink);
  } catch (error) {
    const isPublicError = error instanceof PublicError;

    return Response.json(
      {
        success: false,
        message: isPublicError
          ? error.message
          : "Something went wrong. Failed to generate magic link.",
      },
      { status: isPublicError ? 400 : 500 },
    );
  }

  let response: Response;

  try {
    const mailData = JSON.parse(await env.MAILS.get("Magic Link Email"));

    const mail = mailData[locale],
      { Subject, From_email, SMS, htmlEmail } = mail;

    function replacePlaceholders(text: string): string {
      return text
        .replaceAll("<magic_link>", magicLink)
        .replaceAll("<from_email>", From_email);
    }

    if (email) {
      const finalHTMLEmail = replacePlaceholders(htmlEmail);

      response = await env.EMAIL.fetch(env.EMAIL_WORKER_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-cf-secure-worker-token": env.CF_SECURE_WORKER_TOKEN,
        },
        body: JSON.stringify({
          to: [{ email }],
          subject: Subject,
          content: [{ type: "text/html", value: finalHTMLEmail }],
        }),
      });
    } else {
      const basicAuthToken = btoa(
        env.TWILIO_ACCOUNT_SID + ":" + env.TWILIO_AUTH_TOKEN,
      );

      response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: "POST",
          body: new URLSearchParams({
            To: phone,
            From: env.TWILIO_PHONE_NUMBER,
            Body: replacePlaceholders(SMS),
          }),
          headers: {
            Authorization: "Basic " + basicAuthToken,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
    }

    await response.json();

    if (!response.ok) throw new Error();

    if ("token" in body) {
      await removeToken(env.USERS, body.token);
    }

    return Response.json({ success: true, referrer });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Failed to send magic link.",
      },
      { status: 500 },
    );
  }
};
