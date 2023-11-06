// @ts-check

import fs from "fs/promises";

export default async function rewrite404RoutesPaths(_404HtmlFilePaths) {
  await Promise.all(
    _404HtmlFilePaths.map(async (path) => {
      const newPath = path.replace(/404\/index.html$/, "404.html");

      await fs.rename(path, newPath);
      await fs.rm(path.slice(0, -11), { recursive: true, force: true });
    }),
  );
}
