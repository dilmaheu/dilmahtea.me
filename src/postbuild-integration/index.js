import fs from "fs/promises";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import addSitemapURLs from "./utils/addSitemapURLs.js";
import addScriptsHashes from "./utils/addScriptsHashes.js";
import generateXMLSitemap from "./utils/generateXMLSitemap.js";
import rewrite404RoutesPaths from "./utils/rewrite404RoutesPaths.js";
import generateSecurityHeaders from "./utils/generateSecurityHeaders.js";
import removeAstroIconAttributes from "./utils/removeAstroIconAttributes.js";

const CSPRecord = {
  "default-src": ["'none'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:"],
  "media-src": ["data:"],
  "font-src": ["'self'"],
  "worker-src": ["blob:"],
  "connect-src": ["'self'", "https://api.openreplay.com"],
  "upgrade-insecure-requests": [],
  "script-src": ["'self'", "https://static.openreplay.com"],
};

const sitemap = [];

/** @type {typeof import('astro').AstroIntegration} */
const postbuildIntegration = {
  name: "dilmahtea.me Custom Integration",
  hooks: {
    "astro:build:done": async () => {
      const htmlFilePaths = await globby([
          "./dist/**/*.html",
          "!./dist/**/404/index.html",
        ]),
        _404HtmlFilePaths = await globby("./dist/**/404/index.html"),
        allHtmlFilePaths = [...htmlFilePaths, ..._404HtmlFilePaths];

      await Promise.all(
        allHtmlFilePaths
          .map(async (path) => {
            const htmlContent = await fs.readFile(path, "utf8"),
              { document } = await parseHTML(htmlContent);

            return [
              removeAstroIconAttributes(path, document),
              addScriptsHashes(document, CSPRecord),
              addSitemapURLs(path, document, sitemap, htmlFilePaths),
            ];
          })
          .flat()
      );

      await Promise.all([
        import("./utils/generateRobotsMeta.js"),
        import("./utils/generateSecurityMeta.js"),
        import("./utils/simplifyImageFilenames.js"),
        rewrite404RoutesPaths(_404HtmlFilePaths),
        generateXMLSitemap(sitemap),
        generateSecurityHeaders(CSPRecord),
      ]);
    },
  },
};

export default postbuildIntegration;
