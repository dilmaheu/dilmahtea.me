const siteURL = "https://dilmahtea.me";

export default async function addPageURLs(
  path,
  document,
  sitemap,
  htmlFilePaths
) {
  if (htmlFilePaths.includes(path)) {
    const pageURL = siteURL + path.slice(6, -10),
      canonicalURL = document.querySelector("link[rel='canonical']");

    const docLang = document.documentElement.lang,
      robotsMeta = document
        .querySelector("meta[name='robots']")
        ?.content?.split(",");

    if (
      docLang &&
      pageURL === canonicalURL?.href &&
      !robotsMeta?.includes("noindex")
    ) {
      const alternateURLs = [
        canonicalURL,
        ...document.querySelectorAll("link[rel='alternate'][hreflang]"),
      ];

      sitemap.push({
        loc: pageURL,
        alternateURLs: [...alternateURLs].map((link) => [
          link.hreflang,
          link.href,
        ]),
      });
    }
  }
}
