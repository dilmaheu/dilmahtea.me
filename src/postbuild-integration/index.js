import fs from "fs/promises";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import addSitemapURLs from "./utils/addSitemapURLs.js";
import addScriptsHashes from "./utils/addScriptsHashes.js";
import generateXMLSitemap from "./utils/generateXMLSitemap.js";
import rewrite404RoutesPaths from "./utils/rewrite404RoutesPaths.js";
import generateSecurityHeaders from "./utils/generateSecurityHeaders.js";
import removeAstroIconAttributes from "./utils/removeAstroIconAttributes.js";
import shouldDisplayExperimentals from "../utils/shouldDisplayExperimentals.js";

const CSPRecord = {
  "default-src": ["'none'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "https://cms.dilmahtea.me"],
  "media-src": ["data:"],
  "font-src": ["'self'"],
  "worker-src": ["blob:"],
  "connect-src": ["'self'", "https://api.openreplay.com"],
  "upgrade-insecure-requests": [],
  "script-src": ["'self'", "https://static.openreplay.com"],
};

if (shouldDisplayExperimentals) {
  CSPRecord["connect-src"].push("https://dev.products.scripts.dilmahtea.me");
}

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
            { document } = await parseHTML(htmlContent);

          removeAstroIconAttributes(document);
          addScriptsHashes(document, CSPRecord);
          addSitemapURLs(path, document, sitemap, htmlFilePaths);

          const { simplifyImageFilenames } = await import(
            "./utils/simplifyImageFilenames.js"
          );

          const stringifiedDocument = simplifyImageFilenames(document);

          await fs.writeFile(path, stringifiedDocument);
        })
      );

      await Promise.all([
        import("./utils/generateRobotsMeta.js"),
        import("./utils/generateSecurityMeta.js"),
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
