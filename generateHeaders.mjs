import fs from "fs/promises";
import crypto from "crypto";
import fetch from "node-fetch";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import PermissionsPolicy from "./src/store/PermissionsPolicy.js";

const htmlFilePaths = await globby("./dist/**/*.html");

/* CSP = Content Security Policy */

const sharedCSP = {
  "default-src": ["'none'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "https://dilmahtea.me"],
  "font-src": ["'self'"],
  "worker-src": ["blob:"],
  "connect-src": ["https://api.openreplay.com"],
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

    const nonces = scripts.map((script) => {
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
    await fs.writeFile(path, `<!DOCTYPE html>\n${document.documentElement.outerHTML}`);

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

const response = await fetch(endpoint, {
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

console.log(response);
