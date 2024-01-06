import phoneUtil from "google-libphonenumber";

const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance(),
  { E164 } = phoneUtil.PhoneNumberFormat;

export default function formatNumber(
  number: string | number,
  country: string,
): string {
  number = String(number);

  try {
    const parsedNumber = phoneUtilInstance.parse(
      number.startsWith("+") ? number : "+" + number,
    );

    if (!phoneUtilInstance.isValidNumber(parsedNumber)) throw new Error();

    number = phoneUtilInstance.format(parsedNumber, E164);
  } catch (error) {
    number = phoneUtilInstance.parse(number, country);

    number = phoneUtilInstance.format(number, E164);
  }

  return number as string;
}
