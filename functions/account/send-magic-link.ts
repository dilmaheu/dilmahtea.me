import type { ENV } from "../utils/types";

import { z } from "zod";
import validator from "validator";

import { getToken } from "../utils/token";
import { PublicError } from "../utils/error";

const BodySchema = z.object({
  email_or_phone: z.string(),
  locale: z.string(),
  referrer: z.string(),
});

type Body = z.infer<typeof BodySchema>;

export const onRequestPost: PagesFunction<ENV> = async (context) => {
  const { request, env } = context,
    requestOrigin = new URL(request.url).origin;

  const body = await request.json<Body>();

  let email: string, phone: string, locale: string, referrer: string;

  try {
    const loginData = BodySchema.parse(body);

    const { email_or_phone } = loginData;

    if (validator.isEmail(email_or_phone)) {
      email = email_or_phone;
    } else if (validator.isMobilePhone(email_or_phone)) {
      phone = email_or_phone;
    } else {
      throw new Error();
    }

    ({ locale, referrer } = loginData);

    if (!referrer || new URL(referrer).origin !== requestOrigin) {
      referrer = requestOrigin;
    }
  } catch (error) {
    return Response.json(
      { success: false, message: "Invalid email or phone number" },
      { status: 400 },
    );
  }

  const contact = email || phone;

  try {
    const token = await getToken(env.USERS, locale, contact, referrer);

    var magicLink =
      new URL(request.url).origin + "/account/verify/" + "?token=" + token;
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

      response = await context.env.EMAIL.fetch(request.url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
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

    return Response.json({ success: true });
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
