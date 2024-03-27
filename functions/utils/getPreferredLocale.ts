import { parseCookie } from "lucia/utils";

export default function getPreferredLocale(request: Request) {
  const parsedCookies = parseCookie(request.headers.get("Cookie") || "");

  return parsedCookies.preferredLocale || "en";
}
