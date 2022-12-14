import CMS from "@store/CMS";

const { data: recurringImageData } = CMS.get("recurringImage");

const RecurringImages = {};

Object.keys(recurringImageData.attributes).map((key) => {
  const { url: relativeSrc, alternativeText: alt } =
    recurringImageData.attributes[key].data.attributes;

  const src = import.meta.env.ASSETS_URL + relativeSrc;

  RecurringImages[key] = { src, alt };
});

export default RecurringImages;
