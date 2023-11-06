// @ts-check

import fs from "fs/promises";
import { globby } from "globby";
import { parseHTML } from "linkedom";
import addSitemapURLs from "./tasks/addSitemapURLs.js";
import addScriptsHashes from "./tasks/addScriptsHashes.js";
import generateXMLSitemap from "./tasks/generateXMLSitemap.js";
import rewrite404RoutesPaths from "./tasks/rewrite404RoutesPaths.js";
import generateSecurityHeaders from "./tasks/generateSecurityHeaders.js";
import removeAstroIconAttributes from "./tasks/removeAstroIconAttributes.js";

import CSPRecord from "../store/CSPRecord.js";

const sitemap = [],
  CSPRecords = CSPRecord();

/** @type {typeof import('astro').AstroIntegration} */
const postbuildIntegration = {
  name: "PostBuild Integration",
  hooks: {
    "astro:build:done": async () => {
      const start = performance.now();

      const { simplifyImageFilenames } = await import(
        "./tasks/simplifyImageFilenames.js"
      );

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
          addScriptsHashes(document, CSPRecords);
          addSitemapURLs(path, document, sitemap, htmlFilePaths);

          const stringifiedDocument = simplifyImageFilenames(document);

          await fs.writeFile(path, stringifiedDocument);
        }),
      );

      await Promise.all([
        import("./tasks/generateRobotsMeta.js"),
        import("./tasks/generateSecurityMeta.js"),
        generateXMLSitemap(sitemap),
        generateSecurityHeaders(CSPRecords),
        rewrite404RoutesPaths(_404HtmlFilePaths),
      ]);

      const end = performance.now();

      console.log(`PostBuild Integration took ${end - start}ms`);
    },
  },
};

export default postbuildIntegration;
