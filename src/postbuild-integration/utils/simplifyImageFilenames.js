import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";

const CMSImagesDir = "./public/assets/",
  CMSImagesDestDir = "./dist/assets/";

// assetify CMS images
await fs.promises.cp(CMSImagesDir, CMSImagesDestDir, { recursive: true });

const assetsDir = "./dist/assets/",
  assetsPaths = await globby("./dist/assets/*"),
  imageAssetBaseRegex = /([^]+_)+[0-9a-z]{10}(@\d+w.[0-9a-z]{8})?/;

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
        newPath = "/assets/" + newBasename;

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
