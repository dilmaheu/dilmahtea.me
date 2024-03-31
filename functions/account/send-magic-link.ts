import type { Session } from "lucia";
import type { ENV } from "../utils/types";

import { z } from "zod";
import validator from "validator";

import fetchExactAPI from "../utils/fetchExactAPI";
import getCustomerFilter from "../utils/getCustomerFilter";
import stringifyZodError from "../utils/stringifyZodError";

import D1Strapi from "../utils/D1Strapi";
import { initializeLucia } from "../utils/auth";
import { getToken, removeToken, validateToken } from "../utils/token";
import { PublicError, checkUpdatedContact, isMobilePhone } from "../utils";

const BaseSchema = z.object({
  email: z
    .string()
    .email({ message: "error_invalid_email" })
    .toLowerCase()
    .optional(),
  phone: z
    .string()
    .superRefine((val, ctx) => {
      if (!isMobilePhone(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "error_invalid_phone",
        });
      } else if (!isMobilePhone(val, true)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "error_invalid_i18n_phone",
        });
      }
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

  const recurData = await D1Strapi.getSingle("recurringElement", context);

  const body = await request.json<Body>();

  let email: string,
    phone: string,
    locale: string,
    referrer: string,
    linkWith: string,
    previous_contact: string;

  try {
    if (!body.email && !body.phone)
      throw new PublicError("error_provide_email_or_phone");

    try {
      var bodyData = BodySchema.parse(body);
    } catch (error) {
      throw new PublicError(stringifyZodError(error, recurData));
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
            throw new PublicError(recurData.error_bad_request);
          }
        }
        break;

      case "update": {
        const auth = initializeLucia(env.USERS),
          authRequest = auth.handleRequest(request);

        const session: Session = await authRequest.validate();

        if (!session) throw new PublicError(recurData.error_unauthorized);

        ({ email, phone, referrer, previous_contact } = bodyData);

        ({ locale } = session.user);

        // throw error if account with email or phone already exists
        const DuplicateAccountError = new PublicError(
          recurData.error_contact_already_exists.replace(
            "<contact_type>",
            recurData[`text_contact_type_${email ? "email" : "phone"}`],
          ),
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
        message: isPublicError
          ? recurData[error.message] || error.message
          : recurData.error_something_went_wrong,
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
  } catch (error) {
    const isPublicError = error instanceof PublicError;

    return Response.json(
      {
        success: false,
        message: isPublicError
          ? recurData[error.message] || error.message
          : recurData.error_magic_link_creation_failed,
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
        message: recurData.error_magic_link_sending_failed,
      },
      { status: 500 },
    );
  }
};
