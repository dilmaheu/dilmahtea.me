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
  "font-src": ["'self'"],
  "worker-src": ["blob:"],
  "connect-src": ["'self'", "https://api.openreplay.com"],
  "upgrade-insecure-requests": [],
  "script-src": ["'self'", "https://static.openreplay.com"],
};

await Promise.all(
  allHtmlFilePaths.map(async (path) => {
    const htmlContent = await fs.readFile(path, "utf8"),
      { document } = await parseHTML(htmlContent),
      astroIcons = document.querySelectorAll("[astro-icon]");

    [...astroIcons].forEach((icon) => {
      icon.removeAttribute("astro-icon");
    });

    await fs.writeFile(path, document.toString());

    if (htmlFilePaths.includes(path)) {
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
