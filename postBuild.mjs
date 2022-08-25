import fs from "fs/promises";
import crypto from "crypto";
import fetch from "node-fetch";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";

const htmlFilePaths = await globby([
    "./dist/**/*.html",
    "!./dist/**/404/index.html",
  ]),
  _404HtmlFilePaths = await globby("./dist/**/404/index.html");

/* CSP = Content Security Policy */

const sharedCSP = {
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
};

const CSPHeaders = await Promise.all(
  htmlFilePaths.map(async (path) => {
    const htmlContent = await fs.readFile(path, "utf8");

    const { document } = await parseHTML(htmlContent);

    const scripts = document.querySelectorAll("script");

    const route =
      path === "./dist/404.html"
        ? "/*"
        : path === "./dist/index.html"
        ? "/"
        : path.slice(6, -11) + "/";

    const nonces = [...scripts].map((script) => {
      const nonce = crypto.randomUUID();

      script.setAttribute("nonce", nonce);

      return `'nonce-${nonce}'`;
    });

    const policies = {
      ...sharedCSP,
      "script-src": ["'self'", "https://static.openreplay.com", ...nonces],
    };

    const header = Object.keys(policies)
      .map((directive) => {
        const values = policies[directive];

        const policy =
          values.length === 0 ? directive : `${directive} ${values.join(" ")}`;

        return policy;
      })
      .join("; ");

    // overwrite html to add generated csp header & nonces
    await fs.writeFile(path, document.toString());

    return {
      route,
      header,
    };
  })
);

const { header: defaultCSPHeader } = CSPHeaders.find(
    ({ route }) => route === "/*"
  ),
  routeSpecificCSPHeaders = CSPHeaders.filter(({ route }) => route !== "/*");

const _headersFileContent =
  `/*\n  Permissions-Policy: ${PermissionsPolicy}\n\n` +
  routeSpecificCSPHeaders
    .map(
      ({ route, header }) => `${route}\n  Content-Security-Policy: ${header}`
    )
    .join("\n\n");

// write generated headers to _headers file
await fs.writeFile("./dist/_headers", _headersFileContent);

const { ZONE_ID, RULESET_ID, API_TOKEN } = process.env;

const endpoint = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/rulesets/${RULESET_ID}`;

await fetch(endpoint, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    rules: [
      {
        expression: `(not http.request.uri.path in {${routeSpecificCSPHeaders
          .map(({ route }) => `"${route}"`)
          .join(" ")}})`,
        description: "Default Content-Security-Policy Header",
        action: "rewrite",
        action_parameters: {
          headers: {
            "Content-Security-Policy": {
              operation: "set",
              value: defaultCSPHeader,
            },
          },
        },
      },
    ],
  }),
}).then((res) => res.json());

/* rewrite html file paths of 404 routes */
_404HtmlFilePaths.forEach((path) => {
  const newPath = path.replace(/404\/index.html$/, "404.html");

  fs.rename(path, newPath);
  fs.rm(path.slice(0, -11), { recursive: true, force: true });
});
