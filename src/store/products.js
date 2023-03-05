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

catalog.Products.forEach(({ Title, products: variants }) => {
  const variantsPerProduct = new Proxy({}, ProxyHandler);

  variants.data.forEach(({ attributes: { localizations, ...product } }) => {
    const size = product.size.data.attributes.Title,
      variant = product.variant.data.attributes.Title;

    [
      product,
      ...localizations.data.map(({ attributes }) => attributes),
    ].forEach((productVariant) => {
      const locale = productVariant.locale.substring(0, 2);

      variantsPerProduct[locale].push([variant + " | " + size, productVariant]);
      variantsPerProduct[locale + " | " + size].push([variant, productVariant]);
      variantsPerProduct[locale + " | " + variant].push([size, productVariant]);

      products[locale + " | " + variant + " | " + size].push(productVariant);
    });
  });

  Object.keys(variantsPerProduct).forEach((key) => {
    products[key].push([Title, variantsPerProduct[key]]);
  });
});

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
  get: (key) => products[key],
};
