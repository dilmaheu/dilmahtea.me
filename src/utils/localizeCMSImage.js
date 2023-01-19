const imagesDir = "./public/assets/";

if (!fs.existsSync(imagesDir)) {
  await fs.promises.mkdir(imagesDir, { recursive: true });
}

export default async function localizeCMSImage(relativeUrl) {
  const src = "/assets/" + relativeUrl.slice(9),
    imagePath = "./public" + src;

  if (!fs.existsSync(imagePath)) {
    const remoteSrc = import.meta.env.ASSETS_URL + relativeUrl;

    const imageBuffer = Buffer.from(
      await fetch(remoteSrc).then((res) => res.arrayBuffer())
    );

    await fs.promises.writeFile(imagePath, imageBuffer);
  }

  return src;
}
