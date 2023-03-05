import CMS from "@store/CMS";

const catalog = CMS.get("catalog").data.attributes,
  productSizes = CMS.get("productSizes").data.map(
    ({ attributes }) => attributes.Title
  ),
  productVariants = CMS.get("productVariants").data.map(
    ({ attributes }) => attributes.Title
  );

const variantsOrder = [
  ...productVariants,
  ...productSizes,
  ...productVariants
    .map((variant) => productSizes.map((size) => variant + " | " + size))
    .flat(),
];

const ProxyHandler = {
  get: (target, key) => {
    if (!(key in target)) {
      target[key] = [];
    }

    return target[key];
  },
};

const products = new Proxy({}, ProxyHandler);

const allProducts = catalog.Products.map(({ Title, products: variants }) => {
  const variantsPerProduct = new Proxy({}, ProxyHandler),
    availableVariants = new Proxy({}, ProxyHandler),
    availableSizes = new Proxy({}, ProxyHandler);

  variants.data.forEach(({ attributes: { localizations, ...product } }) => {
    const size = product.size.data.attributes.Title,
      variant = product.variant.data.attributes.Title;

    [
      product,
      ...localizations.data.map(({ attributes }) => attributes),
    ].forEach((attributes) => {
      const locale = attributes.locale.substring(0, 2),
        localizedVariant = attributes.variant.data.attributes.Title,
        localizedSize = attributes.size.data.attributes.Title,
        link = "/" + locale.substring(0, 2) + "/" + attributes.Meta.URL_slug;

      variantsPerProduct[locale].push([variant + " | " + size, attributes]);
      variantsPerProduct[locale + " | " + size].push([variant, attributes]);
      variantsPerProduct[locale + " | " + variant].push([size, attributes]);

      products[locale + " | " + variant + " | " + size].push(attributes);

      attributes.productVariant = variant;
      attributes.productSize = size;

      if (!availableVariants[locale].find(({ value }) => value === variant))
        availableVariants[locale].push({
          value: variant,
          variant: localizedVariant,
          link,
        });

      if (!availableSizes[locale].find(({ value }) => value === size))
        availableSizes[locale].push({
          value: size,
          size: localizedSize,
          link,
        });
    });
  });

  Object.keys(variantsPerProduct).forEach((key) => {
    products[key].push([Title, variantsPerProduct[key]]);
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
}).flat();

// sort products by order of productSizes and productVariants
Object.keys(products).forEach((key) => {
  const filteredProducts = products[key];

  filteredProducts.forEach((product) => {
    if (Array.isArray(product)) {
      const [, variants] = product;

      variants.sort(
        ([aKey], [bKey]) =>
          variantsOrder.indexOf(aKey) - variantsOrder.indexOf(bKey)
      );
    }
  });
});

export default {
  get: (key) => (key === "all" ? { data: allProducts } : products[key]),
};
