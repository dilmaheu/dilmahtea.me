import CMS from "@store/CMS";

const catalog = CMS.get("catalog").data.attributes,
  productSizes = CMS.get("productSizes"),
  productVariants = CMS.get("productVariants"),
  productCategories = CMS.get("productCategories");

const filterUnavailableTypes = ({
  attributes: { products, localizations },
}) => {
  localizations.data = localizations.data.filter(
    (localization) => localization.attributes.products.data.length > 0
  );

  return products.data.length > 0;
};

productSizes.data = productSizes.data.filter(filterUnavailableTypes);
productVariants.data = productVariants.data.filter(filterUnavailableTypes);
productCategories.data = productCategories.data.filter(filterUnavailableTypes);

export const variantsOrder = [
  ...productVariants.data.map(({ attributes }) => attributes.Title),
  ...productSizes.data.map(({ attributes }) => attributes.Title),
  ...productVariants.data.flatMap(({ attributes: { Title: variant } }) =>
    productSizes.data.map(
      ({ attributes: { Title: size } }) => variant + " | " + size
    )
  ),
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
        size = product.size.data.attributes.Title,
        variant = product.variant.data.attributes.Title;

      const names = Object.fromEntries(
        [{ attributes: product }, ...product.localizations.data].map(
          ({ attributes }) => [
            attributes.locale.substring(0, 2),
            attributes.Title,
          ]
        )
      );

      [
        product,
        ...localizations.data.map(({ attributes }) => attributes),
      ].forEach((attributes) => {
        const locale = attributes.locale.substring(0, 2),
          localizedVariant = attributes.variant.data.attributes.Title,
          localizedSize = attributes.size.data.attributes.Title,
          link =
            "/" + locale.substring(0, 2) + "/" + attributes.Meta.URL_slug + "/";

        const format = localizedVariant + " " + localizedSize,
          stockAmount = attributes.Stock_amount,
          thumbnail = {
            src: attributes.Intro_blob.data.attributes.formats.thumbnail.url,
            alt: attributes.Intro_blob.data.attributes.alternativeText,
          };

        variantsPerProduct[locale].push([variant + " | " + size, attributes]);
        variantsPerProduct[locale + " | " + size].push([variant, attributes]);
        variantsPerProduct[locale + " | " + variant].push([size, attributes]);

        Products[locale + " | " + variant + " | " + size].push(attributes);

        attributes.productVariant = variant;
        attributes.productSize = size;
        attributes.names = names;

        if (!availableVariants[locale].some(({ value }) => value === variant)) {
          availableVariants[locale].push({
            value: variant,
            variant: localizedVariant,
            link,
            format,
            stockAmount,
            thumbnail,
          });
        }

        if (!availableSizes[locale].some(({ value }) => value === size)) {
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
        attributes.baseProductTitle = Title;
        attributes.availableVariants =
          availableVariants[attributes.locale.substring(0, 2)];
        attributes.availableSizes =
          availableSizes[attributes.locale.substring(0, 2)];
      });

      return data;
    });

    return processedProducts;
  }
);

// sort products by order of productSizes and productVariants
Object.values(Products)
  .flat()
  .forEach((product) => {
    if (Array.isArray(product)) {
      const [, variants] = product;

      variants.sort(
        ([aKey], [bKey]) =>
          variantsOrder.indexOf(aKey) - variantsOrder.indexOf(bKey)
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
