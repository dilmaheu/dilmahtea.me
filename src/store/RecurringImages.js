import CMS from "@store/CMS";
import localizeCMSImage from "@utils/localizeCMSImage";

const { data: recurringImageData } = CMS.get("recurringImage");

const RecurringImages = {};

await Promise.all(
  Object.keys(recurringImageData.attributes).map(async (key) => {
    const imageData = recurringImageData.attributes[key].data;

    if (imageData) {
      const { url: relativeSrc, alternativeText: alt } = imageData.attributes;

      const src = await localizeCMSImage(relativeSrc);

      RecurringImages[key] = { src, alt };
    }
  })
);

export default RecurringImages;
