// @ts-check

const siteURL = "https://dilmahtea.me";

export default async function addSitemapURLs(
  path,
  document,
  sitemap,
  htmlFilePaths,
) {
  if (htmlFilePaths.includes(path)) {
    const pageURL = siteURL + path.slice(6, -10),
      canonicalURL = document.querySelector("link[rel='canonical']");

    const lastModifiedDate = document
        .querySelector("meta[http-equiv='last-modified']")
        ?.getAttribute("content"),
      robotsMeta = document
        .querySelector("meta[name='robots']")
        ?.getAttribute("content")
        ?.split(", ");

    if (
      lastModifiedDate &&
      pageURL === canonicalURL?.href &&
      !robotsMeta?.includes("noindex")
    ) {
      const alternateURLs = [
        canonicalURL,
        ...document.querySelectorAll("link[rel='alternate'][hreflang]"),
      ];

      sitemap.push({
        loc: pageURL,
        lastModifiedDate,
        alternateURLs: [...alternateURLs].map((link) => [
          link.hreflang,
          link.href,
        ]),
      });
    }
  }
}
