export default function getAvailableLocales(
  flattenedPages: any[],
): [string[], { [locale: string]: string }, string[]] {
  const availableLocales: string[] = [],
    availableLocaleEntries: [string, string][] = [],
    availableSlugs: string[] = [];

  flattenedPages.forEach((attributes) => {
    const locale = (attributes.locale as string).substring(0, 2),
      slug = attributes.Meta.URL_slug as string,
      baseSlug = "/" + (slug === "/" ? "" : slug + "/"),
      fullSlug = "/" + locale + baseSlug;

    availableLocales.push(locale);
    availableLocaleEntries.push([locale, fullSlug]);
    availableSlugs.push(baseSlug);
  });

  return [
    availableLocales,
    Object.fromEntries(availableLocaleEntries),
    [...new Set(availableSlugs)],
  ];
}
