import fs from "node:fs";

const IMAGES_DIR = "./public/_astro/";

if (fs.existsSync(IMAGES_DIR)) {
  await fs.promises.rm(IMAGES_DIR, { recursive: true, force: true });
}

await fs.promises.mkdir(IMAGES_DIR, { recursive: true });

export default async function localizeCMSImage(relativeUrl) {
  const src = "/_astro/" + relativeUrl.slice(9),
    imagePath = "./public" + src;

  if (!fs.existsSync(imagePath)) {
    const remoteSrc = import.meta.env.ASSETS_URL + relativeUrl;

    const imageBuffer = Buffer.from(
      await fetch(remoteSrc).then((res) => res.arrayBuffer()),
    );

    await fs.promises.writeFile(imagePath, imageBuffer);
  }

  return src;
}
