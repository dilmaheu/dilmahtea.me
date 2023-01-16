import fs from "node:fs";
import CMS from "@store/CMS";

const { data: recurringImageData } = CMS.get("recurringImage");

const RecurringImages = {};

await Promise.all(
  Object.keys(recurringImageData.attributes).map(async (key) => {
    const { url: relativeSrc, alternativeText: alt } =
      recurringImageData.attributes[key].data.attributes;

    const src = "/images/" + relativeSrc.slice(9),
      imagesDir = "./public/images/",
      imagePath = "./public" + src;

    if (!fs.existsSync(imagesDir)) {
      await fs.promises.mkdir(imagesDir, { recursive: true });
    }

    if (!fs.existsSync(imagePath)) {
      const remoteSrc = import.meta.env.ASSETS_URL + relativeSrc;

      const imageBuffer = Buffer.from(
        await fetch(remoteSrc).then((res) => res.arrayBuffer())
      );

      await fs.promises.writeFile(imagePath, imageBuffer);
    }

    RecurringImages[key] = { src, alt };
  })
);

export default RecurringImages;
