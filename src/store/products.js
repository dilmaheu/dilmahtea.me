import CMS from "@store/CMS";

const catalog = CMS.get("catalog").data.attributes;

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

export default {
  get: (key) => products[key],
};
