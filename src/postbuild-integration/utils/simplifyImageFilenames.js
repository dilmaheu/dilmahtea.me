import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";

const assetsDir = "./dist/assets/",
  assetsPaths = await globby("./dist/assets/*"),
  imageAssetBaseRegex = /([^]+_)+[0-9a-z]{10}(@\d+w.[0-9a-z]{8})/;

const htmlFilePaths = await globby("./dist/**/*.html");

const htmlFiles = await Promise.all(
  htmlFilePaths.map((htmlFilePath) =>
    fs.promises.readFile(htmlFilePath, "utf8")
  )
);

assetsPaths.forEach((assetPath) => {
  const extname = path.extname(assetPath),
    basename = path.basename(assetPath, extname);

  const match = imageAssetBaseRegex.exec(basename);

  if (match) {
    const [, rawFilename, uniqueSuffix] = match;

    const filteredFilename = rawFilename.slice(0, -1).split("_").join("-"),
      newBasename = filteredFilename + uniqueSuffix + extname;

    fs.renameSync(assetPath, path.join(assetsDir, newBasename));

    htmlFiles.forEach((html, i) => {
      const oldPath = assetPath.slice(6);

      if (html.includes(oldPath)) {
        const newPath = "/assets/" + newBasename;

        htmlFiles[i] = html.replaceAll(oldPath, newPath);
      }
    });
  }
});

htmlFilePaths.forEach((htmlFilePath, i) => {
  fs.writeFileSync(htmlFilePath, htmlFiles[i]);
});
