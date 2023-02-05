import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";

const CMSImagesDir = "./public/_astro/",
  CMSImagesDestDir = "./dist/_astro/";

// assetify CMS images
await fs.promises.cp(CMSImagesDir, CMSImagesDestDir, { recursive: true });

const assetsDir = "./dist/_astro/",
  assetsPaths = await globby("./dist/_astro/*"),
  imageAssetBaseRegex = /([^]+_)+[0-9a-z]{10}(-\d+w)?/;

const pathsDictionary = assetsPaths
  .map((assetPath) => {
    const extname = path.extname(assetPath),
      basename = path.basename(assetPath, extname);

    const match = imageAssetBaseRegex.exec(basename);

    if (match) {
      const [, rawFilename, uniqueSuffix = ""] = match;

      const filteredFilename = rawFilename.slice(0, -1).split("_").join("-"),
        newBasename = filteredFilename + uniqueSuffix + extname;

      fs.renameSync(assetPath, path.join(assetsDir, newBasename));

      const oldPath = assetPath.slice(6),
        newPath = "/_astro/" + newBasename;

      return { oldPath, newPath };
    }
  })
  .filter(Boolean);

export function simplifyImageFilenames(document) {
  let html = document.toString();

  pathsDictionary.forEach(({ oldPath, newPath }) => {
    html = html.replaceAll(oldPath, newPath);
  });

  return html;
}
