export interface Token {
  id: string;
  expires: number;
  contact: string;
  referrer: string;
}

export interface ENV {
  MAILS: KVNamespace;
  EMAIL: Fetcher;
  USERS: D1Database;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
}
