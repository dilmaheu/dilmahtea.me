import products from "@store/products";

export default function getFilteredProducts({
  locale,
  variant,
  size,
  category,
  sub_category,
}) {
  const productKey = [locale, variant, size].filter(Boolean).join(" | ");

  const filteredProducts = structuredClone(products.get(productKey))
    .map((product, i) => {
      if (Array.isArray(product)) {
        const [baseProductTitle, variants] = product;

        return variants.map(([variantKey, variant]) => {
          variant.order = i + 1;
          variant.variantKey = variantKey;
          variant.baseProductTitle = baseProductTitle;

          return variant;
        });
      }

      return product;
    })
    .flat();

  if (category) {
    return filteredProducts.filter(
      (attributes) => attributes.category.data?.attributes.Title === category
    );
  }

  if (sub_category) {
    return filteredProducts.filter(
      (attributes) =>
        attributes.sub_category.data?.attributes.Title === sub_category
    );
  }

  return filteredProducts;
}
