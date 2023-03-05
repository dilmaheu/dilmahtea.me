// @ts-check

import CMS from "./CMS";

const homeProductData = CMS.get("homeProduct").data,
  productSizes = CMS.get("productSizes"),
  productVariants = CMS.get("productVariants"),
  productCategories = CMS.get("productCategories");

const filterUnavailableTypes = ({ attributes }) => {
  const { products, localizations } = attributes;

  localizations.data = localizations.data.filter(
    (localization) => localization.attributes.products.data.length > 0
  );

  return products.data.length > 0;
};

productSizes.data = productSizes.data.filter(filterUnavailableTypes);
productVariants.data = productVariants.data.filter(filterUnavailableTypes);
productCategories.data = productCategories.data.filter(filterUnavailableTypes);

const homeProductVariations = { data: [homeProductData] },
  productCategoriesVariations = { data: [...productCategories.data] };

const generateVariations = (content, variantAttributes, variantType) => {
  const { Title } = variantAttributes,
    slug = Title.toLowerCase().replace(/ /g, "-"),
    contentVariation = structuredClone(content);

  contentVariation.attributes[variantType] = Title;
  contentVariation.attributes.Meta.URL_slug += "/" + slug;

  contentVariation.attributes.localizations.data =
    contentVariation.attributes.localizations.data.filter(({ attributes }) => {
      const localVariantAttributes = variantAttributes.localizations.data.find(
        (variant) => variant.attributes.locale === attributes.locale
      )?.attributes;

      if (localVariantAttributes) {
        attributes[variantType] = Title;
        attributes.Meta.URL_slug += "/" + slug;

        return true;
      }
    });

  (contentVariation.attributes.type === "productCategory"
    ? productCategoriesVariations
    : homeProductVariations
  ).data.push(contentVariation);

  return contentVariation;
};

const contentCollection = [
  homeProductData,
  ...productCategories.data.map((data) => {
    data.attributes.type = "productCategory";

    return data;
  }),
];

contentCollection.forEach((content) => {
  productSizes.data.forEach(({ attributes }) =>
    generateVariations(content, attributes, "size")
  );

  productVariants.data.forEach(({ attributes: variantAttributes }) => {
    const availableSizes = variantAttributes.products.data.map(
      ({ attributes }) => attributes.size.data.attributes.Title
    );

    const generatedHomeProductVariation = generateVariations(
      content,
      variantAttributes,
      "variant"
    );

    productSizes.data
      .filter(({ attributes }) => availableSizes.includes(attributes.Title))
      .forEach(({ attributes: sizeAttributes }) => {
        sizeAttributes = structuredClone(sizeAttributes);

        generateVariations(
          generatedHomeProductVariation,
          sizeAttributes,
          "size"
        );
      });
  });
});

export default {
  homeProductVariations,
  productCategoriesVariations,
};
