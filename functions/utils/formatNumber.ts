import phoneUtil from "google-libphonenumber";

const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance(),
  { E164 } = phoneUtil.PhoneNumberFormat;

export default function formatNumber(number: string, country: string): string {
  number = phoneUtilInstance.parse(number, country);

  number = phoneUtilInstance.format(number, E164);

  return number;
}
