import phoneUtil from "google-libphonenumber";

const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance();

export default function formatNumber(
  number: string | number,
  country: string,
): string {
  number = String(number);

  number =
    number.length === 11
      ? number
      : Object.values(phoneUtilInstance.parse(number, country).values_).join(
          "",
        );

  number = "+" + number;

  return number;
}
