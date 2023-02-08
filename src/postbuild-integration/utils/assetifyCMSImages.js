import fs from "node:fs";

const sourceDir = "./public/_astro/",
  destDir = "./dist/_astro/";

await fs.promises.cp(sourceDir, destDir, { recursive: true });
