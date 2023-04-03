// @ts-check

// @ts-ignore
import CMS from "@store/CMS";

const productSizes = CMS.get("productSizes"),
  productVariants = CMS.get("productVariants");

export function getAvailableVariants(size) {
  return (
    size &&
    Array.from(
      new Set(
        productSizes.data
          .find(({ attributes: { Title } }) => Title === size)
          .attributes.products.data.map(
            ({ attributes }) => attributes.variant.data.attributes.Title
          )
      )
    )
  );
}

export function getAvailableSizes(variant) {
  return (
    variant &&
    Array.from(
      new Set(
        productVariants.data
          .find(({ attributes: { Title } }) => Title === variant)
          .attributes.products.data.map(
            ({ attributes }) => attributes.size.data.attributes.Title
          )
      )
    )
  );
}
