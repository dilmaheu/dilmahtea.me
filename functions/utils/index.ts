import type { Auth } from "./auth";
import type { User, Session } from "lucia";

import validator from "validator";

export class PublicError extends Error {
  private: false;

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    this.private = false;
  }
}

export function getProviderId(contact: string): "email" | "phone" {
  const isEmail = validator.isEmail(contact);

  return isEmail ? "email" : "phone";
}

export async function createSessionCookie(
  auth: Auth,
  user: User,
  attributes: Record<string, any> = {},
): Promise<string> {
  const session: Session = await auth.createSession({
    userId: user.userId,
    attributes,
  });

  const sessionCookie = auth.createSessionCookie(session).serialize();

  return sessionCookie;
}

export function isMobilePhone(
  val: string,
  strictMode: boolean = false,
): boolean {
  return validator.isMobilePhone(val, undefined, { strictMode });
}

export function checkUpdatedContact(str: string): boolean {
  const [providerId, contact] = str.split(":");

  if (!["email", "phone"].includes(providerId)) return false;

  return providerId === "email"
    ? validator.isEmail(contact)
    : isMobilePhone(contact);
}
