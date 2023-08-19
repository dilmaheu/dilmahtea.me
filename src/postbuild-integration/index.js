import fs from "fs/promises";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import addSitemapURLs from "./tasks/addSitemapURLs.js";
import addScriptsHashes from "./tasks/addScriptsHashes.js";
import generateXMLSitemap from "./tasks/generateXMLSitemap.js";
import rewrite404RoutesPaths from "./tasks/rewrite404RoutesPaths.js";
import generateSecurityHeaders from "./tasks/generateSecurityHeaders.js";
import removeAstroIconAttributes from "./tasks/removeAstroIconAttributes.js";

const CSPRecord = {
  "default-src": ["'none'"],
  "style-src": ["'self'", "'unsafe-inline'", "https://use.fontawesome.com"],
  "img-src": ["'self'", "data:", "https://dilmahtea.me"],
  "media-src": ["'self'", "data:"],
  "video-src": ["'self'"],
  "font-src": ["'self'", "https://use.fontawesome.com"],
  "worker-src": ["blob:"],
  "connect-src": [
    "'self'",
    "https://baserow.scripts.dilmahtea.me",
    "https://log.expertrec.com",
    "https://searchv7.expertrec.com",
    "https://api.openreplay.com",
    "https://analytics.scripts.dilmahtea.me",
  ],
  "upgrade-insecure-requests": [],
  "script-src": [
    "'self'",
    "https://cse.expertrec.com",
    "https://static.openreplay.com",
  ],
};

const sitemap = [];

/** @type {typeof import('astro').AstroIntegration} */
const postbuildIntegration = {
  name: "PostBuild Integration",
  hooks: {
    "astro:build:done": async () => {
      const start = performance.now();

      const htmlFilePaths = await globby([
          "./dist/**/*.html",
          "!./dist/**/404/index.html",
        ]),
        _404HtmlFilePaths = await globby("./dist/**/404/index.html"),
        allHtmlFilePaths = [...htmlFilePaths, ..._404HtmlFilePaths];

      await Promise.all(
        allHtmlFilePaths.map(async (path) => {
          const htmlContent = await fs.readFile(path, "utf8"),
            { document } = parseHTML(htmlContent);

          removeAstroIconAttributes(document);
          addScriptsHashes(document, CSPRecord);
          addSitemapURLs(path, document, sitemap, htmlFilePaths);

          const { simplifyImageFilenames } = await import(
            "./tasks/simplifyImageFilenames.js"
          );

          const stringifiedDocument = simplifyImageFilenames(document);

          await fs.writeFile(path, stringifiedDocument);
        }),
      );

      await Promise.all([
        import("./tasks/generateRobotsMeta.js"),
        import("./tasks/generateSecurityMeta.js"),
        generateXMLSitemap(sitemap),
        generateSecurityHeaders(CSPRecord),
        rewrite404RoutesPaths(_404HtmlFilePaths),
      ]);

      const end = performance.now();

      console.log(`PostBuild Integration took ${end - start}ms`);
    },
  },
};

export default postbuildIntegration;
