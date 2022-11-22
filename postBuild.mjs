import crypto from "crypto";
import fs from "fs/promises";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";

const htmlFilePaths = await globby([
    "./dist/**/*.html",
    "!./dist/**/404/index.html",
  ]),
  _404HtmlFilePaths = await globby("./dist/**/404/index.html"),
  allHtmlFilePaths = [...htmlFilePaths, ..._404HtmlFilePaths];

/* CSP = Content Security Policy */

const CSPRecord = {
  "default-src": ["'none'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "https://dilmahtea.me",
    "https://imagedelivery.net",
    "data:",
  ],
  "media-src": ["data:"],
  "font-src": ["'self'"],
  "worker-src": ["blob:"],
  "connect-src": ["'self'", "https://api.openreplay.com"],
  "upgrade-insecure-requests": [],
  "script-src": ["'self'", "https://static.openreplay.com"],
};

const sitemap = [];

await Promise.all(
  allHtmlFilePaths.map(async (path) => {
    const htmlContent = await fs.readFile(path, "utf8"),
      { document } = await parseHTML(htmlContent),
      astroIcons = document.querySelectorAll("[astro-icon]");

    [...astroIcons].forEach((icon) => {
      icon.removeAttribute("astro-icon");
    });

    await fs.writeFile(path, document.toString());

    const scripts = document.querySelectorAll("script");

    [...scripts].forEach(({ textContent }) => {
      const hash = crypto
        .createHash("sha256")
        .update(textContent)
        .digest("base64");

      const source = `'sha256-${hash}'`;

      if (!CSPRecord["script-src"].includes(source)) {
        CSPRecord["script-src"].push(source);
      }
    });

    if (htmlFilePaths.includes(path)) {
      const siteURL = "https://dilmahtea.me",
        pageURL = siteURL + path.slice(6, -10),
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
  })
);

const ContentSecurityPolicy = Object.keys(CSPRecord)
  .map((directive) => {
    const sources = CSPRecord[directive];

    const policy = `${directive} ${sources.join(" ")}`;

    return policy;
  })
  .join("; ");

const _headersFileContent = `/*
  Permissions-Policy: ${PermissionsPolicy}
  
  Content-Security-Policy: ${ContentSecurityPolicy}
`;

// write generated headers to _headers file
await fs.writeFile("./dist/_headers", _headersFileContent);

/* rewrite html file paths of 404 routes */
_404HtmlFilePaths.forEach((path) => {
  const newPath = path.replace(/404\/index.html$/, "404.html");

  fs.rename(path, newPath);
  fs.rm(path.slice(0, -11), { recursive: true, force: true });
});

import { writeFileSync } from "fs";
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const url = process.env.Assets_URL,
  auth = process.env.ACCESS_TOKEN;

const directory = "./dist/robots.txt";

async function getData() {
  const response = await fetch(`${url}/api/robots-text`, {
    method: "GET",
    headers: { Authorization: `Bearer ${auth}` },
  });
  return await response.json();
}
const parsed = await getData();

const text = parsed.data.attributes.Text;

try {
  const data = writeFileSync(directory, text);
} catch (err) {
  console.log(err);
}

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
  .map(({ loc, alternateURLs }) => {
    const alternateXLinks = alternateURLs
      .map(
        ([hreflang, href]) =>
          `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`
      )
      .join("\n    ");

    return `  <url>
    <loc>${loc}</loc>
    ${alternateXLinks}
  </url>`;
  })
  .join("\n\n")}
</urlset>`;

await fs.writeFile("./dist/sitemap.xml", sitemapXML);
