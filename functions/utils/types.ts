export interface Token {
  id: string;
  expires: number;
  locale: string;
  contact: string;
  referrer: string;
  link_with: string;
  previous_contact: string;
}

export interface ENV {
  MAILS: KVNamespace;
  EMAIL: Fetcher;
  USERS: D1Database;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
}
