import CMS from "@store/CMS";

const { data: recurringImageData } = CMS.get("recurringImage");

const RecurringImages = {};

Object.keys(recurringImageData.attributes).map((key) => {
  const { url: src, alternativeText: alt } =
    recurringImageData.attributes[key].data.attributes;

  RecurringImages[key] = { src, alt };
});

export default RecurringImages;
