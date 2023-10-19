import fs from "node:fs";

const { STRAPI_URL } = import.meta.env;

const IMAGES_DIR = "./public/_astro/";

if (fs.existsSync(IMAGES_DIR)) {
  await fs.promises.rm(IMAGES_DIR, { recursive: true, force: true });
}

await fs.promises.mkdir(IMAGES_DIR, { recursive: true });

export default async function localizeCMSImage(remoteURL) {
  let origin, relativeURL;

  const isFullURL = remoteURL.startsWith("https://");

  if (isFullURL) {
    ({ origin, pathname: relativeURL } = new URL(remoteURL));
  } else {
    origin = STRAPI_URL;
    relativeURL = remoteURL;
  }

  const src =
      "/_astro/" + relativeURL.slice(9 /* remove /uploads/ if not full URL */),
    imagePath = "./public" + src;

  if (!fs.existsSync(imagePath)) {
    const remoteSrc = origin + relativeURL;

    const imageBuffer = Buffer.from(
      await fetch(remoteSrc).then((res) => res.arrayBuffer()),
    );

    await fs.promises.writeFile(imagePath, imageBuffer);
  }

  return src;
}
