import fs from "node:fs";

const sourceDir = "./public/assets/",
  destDir = "./dist/assets/";

await fs.promises.cp(sourceDir, destDir, { recursive: true });
