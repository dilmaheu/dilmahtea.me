export default function getAvailableLocales(
  flattenedPages: any[]
): [string[], [string, string][]] {
  const availableLocales: string[] = [],
    availableLocaleEntries: [string, string][] = [];

  flattenedPages.forEach((attributes) => {
    const locale = (attributes.locale as string).substring(0, 2),
      slug = attributes.Meta?.URL_slug as string,
      fullSlug = "/" + (slug === "/" ? locale : locale + "/" + slug) + "/";

    availableLocales.push(locale);
    availableLocaleEntries.push([locale, fullSlug]);
  });

  return [availableLocales, availableLocaleEntries];
}
