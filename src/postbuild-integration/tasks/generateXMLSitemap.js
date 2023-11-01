// @ts-check

import fs from "fs/promises";

export default async function generateXMLSitemap(sitemap) {
  const sitemapURLs = sitemap
    .map(({ loc, lastModifiedDate, alternateURLs }) => {
      const alternateXLinks = alternateURLs
        .map(
          ([hreflang, href]) =>
            `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
        )
        .join("");

      return `
        <url>
          <loc>${loc}</loc>
          <lastmod>${lastModifiedDate}</lastmod>
          ${alternateXLinks}
        </url>
      `;
    })
    .join("");

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${sitemapURLs}
    </urlset>
  `;

  await fs.writeFile("./dist/sitemap.xml", sitemapXML);
}
