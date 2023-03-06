import productsStore from "@store/products";
import localizeCMSImage from "@utils/localizeCMSImage";

const products = Object.fromEntries(
  await Promise.all(
    productsStore.get("all").data.map(async ({ attributes }) => {
      const { SKU: sku, Price } = attributes;

      const tax = Math.round(Price * 9) / 100,
        price = Price + tax,
        size = attributes.Weight_tea + attributes.Weight_tea_unit,
        image = await localizeCMSImage(
          attributes.Intro_blob.data.attributes.formats.thumbnail.url
        );

      const names = JSON.stringify(
        Object.fromEntries(
          [{ attributes }, ...attributes.localizations.data].map(
            ({ attributes: { locale, Title } }) => [
              locale.substring(0, 2),
              Title,
            ]
          )
        )
      );

      return [sku, { sku, tax, price, size, image, names }];
    })
  )
);

export function get() {
  return {
    body: JSON.stringify(products),
  };
}
