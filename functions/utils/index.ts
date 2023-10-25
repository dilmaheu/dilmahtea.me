import type { Auth } from "./auth";
import type { User, Session } from "lucia";

export class PublicError extends Error {
  private: false;

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    this.private = false;
  }
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
