import CMS from "@store/CMS";

const catalog = CMS.get("catalog").data.attributes,
  productSizes = CMS.get("productSizes"),
  productVariants = CMS.get("productVariants"),
  productCategories = CMS.get("productCategories");

const filterUnavailableTypes = ({
  attributes: { products, products_tea_range, localizations },
}) => {
  localizations.data = localizations.data.filter(
    (localization) =>
      localization.attributes.products.data.length > 0 ||
      localization.attributes.products_tea_range?.data.length > 0,
  );

  return products.data.length > 0 || products_tea_range?.data.length > 0;
};

productSizes.data = productSizes.data.filter(filterUnavailableTypes);
productVariants.data = productVariants.data.filter(filterUnavailableTypes);
productCategories.data = productCategories.data.filter(filterUnavailableTypes);

export const variantsOrder = [
  "None",
  ...productVariants.data.map(({ attributes }) => attributes.Title),
  ...productSizes.data.map(({ attributes }) => attributes.Title),
  ...productVariants.data.flatMap(({ attributes: { Title: variant } }) =>
    productSizes.data.map(
      ({ attributes: { Title: size } }) => variant + " | " + size,
    ),
  ),
];

export const teaBag = productVariants.data.find(
  ({ attributes }) => attributes.is_tea_bag,
).attributes.Title;

export const teaBagVariants = [
  teaBag,
  ...productVariants.data
    .filter(({ attributes }) => attributes.is_tea_bag_subvariant)
    .map(({ attributes }) => attributes.Title),
];

const ProxyHandler = {
  get: (target, key) => {
    if (!(key in target)) {
      target[key] = [];
    }

    return target[key];
  },
};

const Products = new Proxy({}, ProxyHandler);

const allProducts = catalog.Products.flatMap(
  ({ Title, products: variants }) => {
    const variantsPerProduct = new Proxy({}, ProxyHandler),
      availableVariants = new Proxy({}, ProxyHandler),
      availableSizes = new Proxy({}, ProxyHandler);

    variants.data.forEach(({ attributes: product }) => {
      const { localizations } = product,
        size = product.size.data?.attributes.Title || null,
        variant = product.variant.data?.attributes.Title || null;

      const names = Object.fromEntries(
        [{ attributes: product }, ...product.localizations.data].map(
          ({ attributes }) => [
            attributes.locale.substring(0, 2),
            attributes.Title,
          ],
        ),
      );

      [
        product,
        ...localizations.data.map(({ attributes }) => attributes),
      ].forEach((attributes) => {
        const locale = attributes.locale.substring(0, 2),
          localizedVariant = attributes.variant.data?.attributes.Title,
          localizedSize = attributes.size.data?.attributes.Title,
          link =
            "/" + locale.substring(0, 2) + "/" + attributes.Meta.URL_slug + "/";

        const stockAmount = attributes.Stock_amount,
          thumbnail = {
            src: attributes.Intro_blob.data.attributes.formats.thumbnail.url,
            alt: attributes.Intro_blob.data.attributes.alternativeText,
          };

        const format =
            [localizedVariant, localizedSize].filter(Boolean).join(" ") || null,
          localizedVariantIcon = localizedVariant
            ? {
                src: attributes.variant.data.attributes.Icon.data?.attributes
                  .url,
                alt: attributes.variant.data.attributes.Icon.data
                  ?.alternativeText,
              }
            : null;

        variantsPerProduct[locale].push([
          [variant, size].filter(Boolean).join(" | ") || "None",
          attributes,
        ]);

        if (variant) {
          if (variant !== teaBag) {
            variantsPerProduct[locale + " | " + variant].push([
              size || "None",
              attributes,
            ]);
          }

          if (teaBagVariants.includes(variant)) {
            variantsPerProduct[locale + " | " + teaBag].push([
              variant + " | " + size,
              attributes,
            ]);
          }
        }

        if (size) {
          variantsPerProduct[locale + " | " + size].push([
            variant || "None",
            attributes,
          ]);

          if (teaBagVariants.includes(variant)) {
            variantsPerProduct[locale + " | " + size].push([
              teaBag,
              attributes,
            ]);
          }
        }

        if (variant && size) {
          Products[locale + " | " + variant + " | " + size].push(attributes);

          if (teaBagVariants.includes(variant)) {
            Products[locale + " | " + teaBag + " | " + size].push(attributes);
          }
        }

        attributes.names = names;
        variant && (attributes.productVariant = variant);
        size && (attributes.productSize = size);
        format && (attributes.productLocalizedFormat = format);

        if (
          variant &&
          !availableVariants[locale].some(({ value }) => value === variant)
        ) {
          availableVariants[locale].push({
            value: variant,
            variant: localizedVariant,
            variantIcon: localizedVariantIcon,
            link,
            format,
            stockAmount,
            thumbnail,
          });
        }

        if (
          size &&
          !availableSizes[locale].some(({ value }) => value === size)
        ) {
          availableSizes[locale].push({
            value: size,
            size: localizedSize,
            link,
            format,
            stockAmount,
            thumbnail,
          });
        }
      });
    });

    Object.keys(variantsPerProduct).forEach((key) => {
      Products[key].push([Title, variantsPerProduct[key]]);
    });

    const processedProducts = variants.data.map((data) => {
      const { attributes } = data;

      const flattenedVariants = [
        attributes,
        ...attributes.localizations.data.map(({ attributes }) => attributes),
      ];

      flattenedVariants.forEach((attributes) => {
        const locale = attributes.locale.substring(0, 2);

        attributes.baseProductTitle = Title;
        attributes.availableVariants = availableVariants[locale];
        attributes.availableSizes = availableSizes[locale];

        // remove duplicates & current format from availableFormats
        const formats = [];

        attributes.productLocalizedFormat &&
          formats.push(attributes.productLocalizedFormat);

        const availableFormats = [
          ...attributes.availableVariants,
          ...attributes.availableSizes,
        ]
          .filter(({ format, stockAmount }) => {
            if (formats.includes(format)) return false;

            formats.push(format);

            return stockAmount;
          })
          .sort(
            ({ value: a }, { value: b }) =>
              variantsOrder.indexOf(a) - variantsOrder.indexOf(b),
          );

        attributes.availableFormats = availableFormats;
      });

      return data;
    });

    return processedProducts;
  },
);

// sort products by order of productSizes and productVariants
Object.values(Products)
  .flat()
  .forEach((product) => {
    if (Array.isArray(product)) {
      const [, variants] = product;

      variants.sort(
        ([aKey], [bKey]) =>
          variantsOrder.indexOf(aKey) - variantsOrder.indexOf(bKey),
      );
    }
  });

export default {
  get: (key) =>
    key === "all"
      ? { data: allProducts }
      : key === "store"
        ? Products
        : Products[key],
};
