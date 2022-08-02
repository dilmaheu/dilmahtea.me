import fs from "fs/promises";
import crypto from "crypto";
import { globby } from "globby";
import { parseHTML } from "linkedom";

const htmlFilePaths = await globby("./dist/**/*.html");

const commonPolicies = {
  "default-src": ["'none'"],
  "style-src": ["'unsafe-inline'"],
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
        : path.slice(6, -11);

    const nonces = scripts.map((script) => {
      const nonce = crypto.randomUUID();

      script.setAttribute("nonce", nonce);

      return `'nonce-${nonce}'`;
    });

    const policies = {
      ...commonPolicies,
      "script-src": ["'self'", "https://static.openreplay.com", ...nonces],
    };

    const CSPHeader = Object.keys(policies)
      .map((directive) => {
        const values = policies[directive];

        const policy =
          values.length === 0 ? directive : `${directive} ${values.join(" ")}`;

        return policy;
      })
      .join("; ");

    document.head.insertAdjacentHTML(
      "beforeend",
      `<meta http-equiv="Content-Security-Policy" content="${CSPHeader}">`
    );

    // overwrite html to add generated csp header & nonces
    await fs.writeFile(path, document.documentElement.outerHTML);

    return {
      route,
      CSPHeader,
    };
  })
)
  // put 404 page csp header at end
  .reverse();

const _headersFileContent = CSPHeaders.map(
  ({ route, CSPHeader }) => `${route}\n  Content-Security-Policy: ${CSPHeader}`
).join("\n\n");

// write generated headers to _headers file
await fs.writeFile("./dist/_headers", _headersFileContent);
