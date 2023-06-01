import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";

dotenv.config({ path: "./.env" });

const CMS_ENDPOINT = process.env.ASSETS_URL;

const rawData = await readFile(".cache/CMS.json");
const data = JSON.parse(rawData);
const filteredData = {};
const selectedPages = [
  "blogs",
  "howTos",
  "estates",
  "products",
  "productCategories",
  "homepage",
  "homeEstate",
  "homeProduct",
  "homeElephantPath",
];

for (const page of selectedPages) {
  if (page in data.data) {
    const pageData = data.data[page];
    const pageArray = Array.isArray(pageData.data)
      ? pageData.data
      : [pageData.data];
    filteredData[page] = {
      data: pageArray
        .map(({ attributes }) => {
          const filteredObj = {
            attributes: {
              locale: attributes.locale,
              Title: attributes.Title || attributes.Estate_name,
              Intro_text: attributes.Intro_text.slice(
                0,
                60 || attributes.Intro_text.length
              ).replace(/(<([^>]+)>)/gi, ""),
              Intro_blob: {
                url:
                  CMS_ENDPOINT +
                  (attributes?.Intro_blob?.data.attributes?.formats?.thumbnail
                    .url || attributes?.Intro_blob?.data.attributes.url),
                alt: attributes?.Intro_blob?.data.attributes.alternativeText,
              },
              URL_slug: attributes.Meta.URL_slug,
            },
          };

          if (attributes.localizations?.data?.length) {
            filteredObj.attributes.localizations = {
              data: attributes.localizations.data.map(({ attributes }) => ({
                attributes: {
                  locale: attributes.locale,
                  Title: attributes.Title || attributes.Estate_name,
                  Intro_text: attributes.Intro_text.slice(
                    0,
                    60 || attributes.Intro_text.length
                  ).replace(/(<([^>]+)>)/gi, ""),
                  Intro_blob: {
                    url:
                      CMS_ENDPOINT +
                      (attributes?.Intro_blob?.data.attributes?.formats
                        ?.thumbnail.url ||
                        attributes?.Intro_blob?.data.attributes.url),
                    alt: attributes?.Intro_blob?.data.attributes
                      .alternativeText,
                  },
                  URL_slug: attributes.Meta.URL_slug,
                },
              })),
            };
          }

          return filteredObj;
        })
        .filter((obj) => Object.keys(obj.attributes).length > 0),
    };
  }
}

// write filtered data to SearchData file
await writeFile(
  "./dist/SearchData.json",
  JSON.stringify({ data: filteredData }),
  "utf8"
);
