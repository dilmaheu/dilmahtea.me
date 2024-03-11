export default function getLocalizedLink(locale: string, slug: string): string {
  return "/" + locale + "/" + slug + "/";
}
