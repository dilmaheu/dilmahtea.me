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

export function isMobilePhone(str: string): boolean {
  return validator.isMobilePhone(str, undefined, { strictMode: true });
}
