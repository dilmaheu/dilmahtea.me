import { marked } from "marked";
import { renderPicture } from "astro-imagetools/api";
import tryUntilResolve from "@utils/tryUntilResolve";
import productsStore, { variantsOrder } from "@store/Products";

const { ASSETS_URL } = import.meta.env;

async function processProductData(attributes) {
  if (attributes.In_stock_date) {
    attributes.In_stock_date = new Date(attributes.In_stock_date);
  }

  const {
    locale,
    SKU,
    Title,
    names,
    Intro_text,
    Stock_amount,
    variant,
    Weight_tea,
    Weight_tea_unit,
    estate_name,
    Intro_blob,
    category,
    sub_category,
    productVariant: tea_variant,
    productSize: tea_size,
    availableVariants,
    availableSizes,
    Meta: { URL_slug },
  } = attributes;

  try {
    var Intro_blob_HTML = Object.values(
      await tryUntilResolve(
        () =>
          renderPicture({
            attributes: { img: { style: "aspect-ratio: 6 / 5;" } },
            alt: Intro_blob.data.attributes.alternativeText,
            src: ASSETS_URL + Intro_blob.data.attributes.url,
            sizes: [
              "(min-width: 1024px) calc((90vw - (clamp(24px, 3.125vw - 8px, 32px) * 2)) / 3)",
              "(min-width: 640px) calc(45vw - 16px)",
              "min(90vw, 380px)",
            ].join(", "),
          }),
        (message) => message + " " + ASSETS_URL + Intro_blob.data.attributes.url
      )
    ).join("");
  } catch (error) {
    console.log({
      message: error.message,
      url: Intro_blob.data.attributes.url,
    });
  }

  const Intro_text_HTML = marked(Intro_text);

  let availableFormatsCount, availableFormatThumbnails;

  if (Stock_amount === 0) {
    const formats = [];

    const availableFormats = [...availableVariants, ...availableSizes].filter(
      ({ format, stockAmount }) => {
        if (formats.includes(format)) return false;

        formats.push(format);

        return stockAmount;
      }
    );

    availableFormats.sort(
      ({ value: a }, { value: b }) =>
        variantsOrder.indexOf(a) - variantsOrder.indexOf(b)
    );

    availableFormatsCount = availableFormats.length;

    try {
      availableFormatThumbnails = await Promise.all(
        availableFormats.slice(0, 2).map(async ({ thumbnail }) => ({
          src: await tryUntilResolve(
            () => importRemoteImage(ASSETS_URL + thumbnail.src),
            (message) => message + " " + ASSETS_URL + thumbnail.src
          ),
          alt: thumbnail.alt,
        }))
      );
    } catch (error) {
      console.log({
        message: error.message,
        src: Intro_blob.data.attributes.url,
      });

      throw error;
    }
  }

  const thumbnail = await importRemoteImage(
    ASSETS_URL + Intro_blob.data.attributes.formats.thumbnail.url
  );

  // reduce load on client
  let { In_stock_date, Price } = attributes;

  In_stock_date =
    In_stock_date &&
    new Date(In_stock_date).toLocaleString("en-GB", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });

  const Tax = Math.round(Number(Price) * 9) / 100;

  Price += Tax;

  return {
    SKU,
    Title,
    names: JSON.stringify(names),
    Intro_blob_HTML,
    Intro_text_HTML,
    Stock_amount,
    In_stock_date,
    Price,
    Tax,
    variant,
    Weight_tea,
    Weight_tea_unit,
    estate_name,
    thumbnail,
    tea_variant,
    tea_size,
    availableFormatsCount,
    availableFormatThumbnails,
    category: category.data?.attributes.Title,
    subCategory: sub_category.data?.attributes.Title,
    Meta: { URL_slug: "/" + locale.substring(0, 2) + "/" + URL_slug + "/" },
  };
}

const products = productsStore.get("store"),
  processedProducts = Object.fromEntries(
    await Promise.all(
      Object.keys(products).map(async (key) => {
        const filteredProducts = products[key];

        return [
          key,
          await Promise.all(
            filteredProducts.map(async (product, i) => {
              if (Array.isArray(product)) {
                const [baseProductTitle, variants] = product;

                return [
                  baseProductTitle,
                  await Promise.all(
                    variants.map(async ([variantKey, variant]) => [
                      variantKey,
                      await processProductData(variant),
                    ])
                  ),
                ];
              }

              return await processProductData(product);
            })
          ),
        ];
      })
    )
  );

export function getStaticPaths() {
  return Object.keys(processedProducts).map((key) => {
    key = key.replace(/ \| /g, "/");

    return { params: { key } };
  });
}

export function get({ params: { key } }) {
  key = key.replace(/\//g, " | ");

  const products = processedProducts[key];

  return {
    body: JSON.stringify(products),
  };
}
