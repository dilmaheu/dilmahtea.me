import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";

dotenv.config({ path: "./.env" });

const CMS_ENDPOINT = process.env.ASSETS_URL;

const rawData = await readFile(".cache/CMS.json");
const data = JSON.parse(rawData);
const selectedPages = [
  "blogs",
  "howTos",
  "estates",
  "homepage",
  "products",
  "homeEstate",
  "homeProduct",
  "homeElephantPath",
  "productCategories",
];

const filteredData = selectedPages.reduce((result, page) => {
  if (page in data.data) {
    const pageData = data.data[page];
    const pageArray = Array.isArray(pageData.data)
      ? pageData.data
      : [pageData.data];

    const pageFilteredData = pageArray
      .map(({ attributes }) => {
        const filteredObj = {
          locale: attributes?.locale,
          Title: attributes?.Title || attributes?.Estate_name,
          Intro_text: attributes?.Intro_text?.slice(0, 60).replace(
            /(<([^>]+)>)/gi,
            ""
          ),
          Intro_blob: {
            url:
              CMS_ENDPOINT +
              (attributes?.Intro_blob?.data?.attributes?.formats?.thumbnail
                ?.url || attributes?.Intro_blob?.data?.attributes?.url),
            alt: attributes?.Intro_blob?.data?.attributes?.alternativeText,
          },
          URL_slug: attributes?.Meta?.URL_slug,
        };

        if (attributes?.localizations?.data?.length) {
          filteredObj.localizations = attributes.localizations.data.map(
            ({ attributes }) => ({
              locale: attributes?.locale,
              Title: attributes?.Title || attributes?.Estate_name,
              Intro_text: attributes?.Intro_text?.slice(0, 60).replace(
                /(<([^>]+)>)/gi,
                ""
              ),
              Intro_blob: {
                url:
                  CMS_ENDPOINT +
                  (attributes?.Intro_blob?.data?.attributes?.formats?.thumbnail
                    ?.url || attributes?.Intro_blob?.data?.attributes?.url),
                alt: attributes?.Intro_blob?.data?.attributes?.alternativeText,
              },
              URL_slug: attributes?.Meta?.URL_slug,
            })
          );
        }

        return filteredObj;
      })
      .filter((obj) => Object.keys(obj).length > 0);

    result = [...result, ...pageFilteredData];
  }

  return result;
}, []);

// Sort the filtered data alphabetically by Title
filteredData.sort((a, b) => a.Title.localeCompare(b.Title));

// write filtered data to SearchData file
await writeFile(
  "./dist/SearchData.json",
  JSON.stringify({ data: filteredData }),
  "utf8"
);
