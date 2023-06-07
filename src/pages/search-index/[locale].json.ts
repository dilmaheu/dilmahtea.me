import CMS from "@store/CMS.js";

const { ASSETS_URL } = import.meta.env,
  selectedPages = [
  "blogs",
  "howTos",
  "recipes",
  "estates",
  "homepage",
  "products",
  "homeEstate",
  "homeProduct",
  "homeElephantPath",
  "productCategories",
];

const allCMSData = CMS.get("all");

function processData(selectedPages, data) {
  const processedData = {};

  for (const page of selectedPages) {
    if (page in data) {
      const { data: pageData } = data[page];
      const pageArray = Array.isArray(pageData) ? pageData : [pageData];

      for (const { attributes } of pageArray) {
        // Destructure attributes object
        const {
          locale,
          Intro_text,
          Intro_blob,
          Meta,
          localizations,
          ...restAttributes
        } = attributes;

        // Process localizations
        const processedLocalizations = localizations?.data?.map(
          ({ attributes }) => {
            const {
              locale,
              Intro_text,
              Intro_blob,
              URL_slug,
              ...restLocalizations
            } = attributes;
            return {
              locale,
              Title: restLocalizations?.Title || restLocalizations?.Estate_name,
              Intro_text: Intro_text?.slice(0, 60).replace(/(<([^>]+)>)/gi, ""),
              Intro_blob: {
                url:
                  ASSETS_URL +
                  (Intro_blob?.data?.attributes?.formats?.thumbnail?.url ||
                    Intro_blob?.data?.attributes?.url),
                alt: Intro_blob?.data?.attributes?.alternativeText,
              },
              URL_slug: Meta.URL_slug,
            };
          }
        );

        // Extract key from locale
        const key = locale.substring(0, 2);

        // Create compressed item
        const compressedItem = {
          Title: restAttributes?.Title || restAttributes?.Estate_name,
          Intro_text: Intro_text?.slice(0, 60).replace(/(<([^>]+)>)/gi, ""),
          Intro_blob: {
            url:
              ASSETS_URL +
              (Intro_blob?.data?.attributes?.formats?.thumbnail?.url ||
                Intro_blob?.data?.attributes?.url),
            alt: Intro_blob?.data?.attributes?.alternativeText,
          },
          URL_slug: Meta.URL_slug,
        };

        // Store compressed item in processedData
        if (!(key in processedData)) {
          processedData[key] = [];
        }
        processedData[key].push(compressedItem);

        // Process localizations and store them in processedData
        if (processedLocalizations?.length) {
          for (const localization of processedLocalizations) {
            const { locale, Title, Intro_text, Intro_blob, URL_slug } =
              localization;
            const locKey = locale.substring(0, 2);
            const compressedLocItem = {
              Title,
              Intro_text,
              Intro_blob,
              URL_slug,
            };

            if (!(locKey in processedData)) {
              processedData[locKey] = [];
            }
            processedData[locKey].push(compressedLocItem);
          }
        }
      }
    }
  }

  // Sort the processedData alphabetically by Title
  for (const key in processedData) {
    processedData[key].sort((a, b) => a.Title.localeCompare(b.Title));
  }

  return processedData;
}

const processedData = processData(selectedPages, allCMSData);

export function getStaticPaths() {
  const staticPaths = Object.keys(processedData).map((key) => {
    return { params: { locale: key } };
  });

  const jsonData = staticPaths.map((path) => {
    const { params } = path;
    const locales = get({ params });
    return {
      params,
      data: locales.body,
    };
  });

  return jsonData;
}

export function get({ params: { locale } }) {
  const locales = processedData[locale];

  return {
    body: JSON.stringify(locales),
  };
}
