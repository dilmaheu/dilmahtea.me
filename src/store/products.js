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
    [
      product,
      ...localizations.data.map(({ attributes }) => attributes),
    ].forEach((product) => {
      const locale = product.locale.substring(0, 2),
        size = product.size.data.attributes.Title,
        variant = product.variant.data.attributes.Title;

      variantsPerProduct[locale].push([variant + " | " + size, product]);
      variantsPerProduct[locale + " | " + size].push([variant, product]);
      variantsPerProduct[locale + " | " + variant].push([size, product]);

      products[locale + " | " + variant + " | " + size].push(product);
    });
  });

  Object.keys(variantsPerProduct).forEach((key) => {
    products[key].push([Title, variantsPerProduct[key]]);
  });
});

export default {
  get: (key) => products[key],
};
