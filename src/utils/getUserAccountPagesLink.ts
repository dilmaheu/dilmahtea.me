import CMS from "@store/CMS";
import getLocalizedLink from "@utils/getLocalizedLink";

export default function getUserAccountPagesLink(
  uid: string,
  locale: string,
): string {
  const link = CMS.get("userAccounts", locale).find(
    ({ attributes: { UID } }) => UID === uid,
  ).attributes.Meta.URL_slug;

  return getLocalizedLink(locale, link);
}
