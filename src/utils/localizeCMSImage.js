import fs from "node:fs";

const { STRAPI_URL } = import.meta.env;

const IMAGES_DIR = "./public/_astro/";

if (fs.existsSync(IMAGES_DIR)) {
  await fs.promises.rm(IMAGES_DIR, { recursive: true, force: true });
}

await fs.promises.mkdir(IMAGES_DIR, { recursive: true });

export default async function localizeCMSImage(relativeUrl) {
  const isFullURL = relativeUrl.startsWith("https://");

  const src =
      "/_astro/" + relativeUrl.slice((isFullURL ? STRAPI_URL.length : 0) + 9),
    imagePath = "./public" + src;

  if (!fs.existsSync(imagePath)) {
    const remoteSrc = (isFullURL ? "" : STRAPI_URL) + relativeUrl;

    const imageBuffer = Buffer.from(
      await fetch(remoteSrc).then((res) => res.arrayBuffer()),
    );

    await fs.promises.writeFile(imagePath, imageBuffer);
  }

  return src;
}
