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
  EXACT_TOKENS: KVNamespace;
  EXACT_GUID_COLLECTION: KVNamespace;
  EMAIL: Fetcher;
  EXACT_ACCOUNT: Fetcher;
  USERS: D1Database;
  EMAIL_WORKER_URL: string;
  EXACT_ACCOUNT_WORKER_URL: string;
  CF_SECURE_WORKER_TOKEN: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
  EXACT_API_ENDPOINT: string;
}
