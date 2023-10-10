import { marked } from "marked";
import { renderPicture } from "astro-imagetools/api";

import productsStore from "@store/Products";
import tryUntilResolve from "@utils/tryUntilResolve";
import getPriceIncludingTax from "@utils/shared/getPriceIncludingTax";

const { STRAPI_URL } = import.meta.env;

async function processProductData(attributes) {
  if (attributes.In_stock_date) {
    attributes.In_stock_date = new Date(attributes.In_stock_date);
  }

  const {
    locale,
    SKU,
    rank,
    Title,
    Intro_text,
    VatPercentage,
    Stock_amount,
    variant,
    Weight_tea,
    Weight_tea_unit,
    estate_name,
    Intro_blob,
    category,
    category_tea_range,
    sub_category,
    productVariant: tea_variant,
    productSize: tea_size,
    availableFormats,
    Meta: { URL_slug },
  } = attributes;

  const productLocalizedSize = attributes.size.data?.attributes.Title;

  try {
    var Intro_blob_HTML = Object.values(
      await tryUntilResolve(
        () =>
          renderPicture({
            attributes: { img: { style: "aspect-ratio: 6 / 5;" } },
            alt: Intro_blob.data.attributes.alternativeText,
            src: STRAPI_URL + Intro_blob.data.attributes.url,
            sizes: [
              "(min-width: 1024px) calc((90vw - (clamp(24px, 3.125vw - 8px, 32px) * 2)) / 3)",
              "(min-width: 640px) calc(45vw - 16px)",
              "min(90vw, 380px)",
            ].join(", "),
          }),
        (message) =>
          message + " " + STRAPI_URL + Intro_blob.data.attributes.url,
      ),
    ).join("");
  } catch (error) {
    console.log({
      message: error.message,
      url: Intro_blob.data.attributes.url,
    });
  }

  const Intro_text_HTML = marked(Intro_text);

  let availableFormatsCount, availableFormatThumbnails;

  availableFormatsCount = availableFormats.length;

  try {
    availableFormatThumbnails = await Promise.all(
      availableFormats.slice(0, 2).map(async ({ thumbnail }) => ({
        src: await tryUntilResolve(
          () => importImage(STRAPI_URL + thumbnail.src),
          (message) => message + " " + STRAPI_URL + thumbnail.src,
        ),
        alt: thumbnail.alt,
      })),
    );
  } catch (error) {
    console.log({
      message: error.message,
      src: Intro_blob.data.attributes.url,
    });

    throw error;
  }

  // reduce load on client
  let { In_stock_date, Price } = attributes;

  In_stock_date =
    In_stock_date &&
    new Date(In_stock_date).toLocaleString("en-GB", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });

  const [_, PriceIncludingTax] = getPriceIncludingTax({
    Price,
    VatPercentage,
    quantity: 1,
  });

  return {
    SKU,
    rank,
    Title,
    Intro_blob_HTML,
    Intro_text_HTML,
    Stock_amount,
    In_stock_date,
    PriceIncludingTax,
    variant,
    Weight_tea,
    Weight_tea_unit,
    estate_name,
    tea_variant,
    tea_size,
    productLocalizedSize,
    availableFormatsCount,
    availableFormatThumbnails,
    category: category.data?.attributes.Title,
    categoryTeaRange: category_tea_range.data?.attributes.Title,
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
                    ]),
                  ),
                ];
              }

              return await processProductData(product);
            }),
          ),
        ];
      }),
    ),
  );

export function getStaticPaths() {
  return Object.keys(processedProducts).map((key) => {
    key = key.replace(/ \| /g, "/");

    return { params: { key } };
  });
}

export function GET({ params: { key } }) {
  key = key.replace(/\//g, " | ");

  const products = processedProducts[key];

  return new Response(JSON.stringify(products));
}
