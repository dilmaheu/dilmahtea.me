import fs from "fs";
import { globby } from "globby";
import printMessage from "@utils/printMessage";

const queryPaths = await globby("./src/queries/*.graphql"),
  queries = await Promise.all(
    queryPaths.map((path) => fs.promises.readFile(path, "utf8"))
  );

const queryRegex = /((?<=^\s*){|(?<=\s+)query\s+{)(.*)}\s*$/s;

const fragments = [],
  query =
    "{" +
    queries
      .map((query) => {
        const [match, , queryContent] = queryRegex.exec(query);

        fragments.push(query.replace(match, ""));

        return queryContent;
      })
      .join("") +
    "}",
  fullQuery = fragments.join("\n") + "\n" + query;

const { data } = await fetch(import.meta.env.DB_URL, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.ACCESS_TOKEN}`,
  },
  body: JSON.stringify({
    query: fullQuery,
  }),
})
  .then(async (res) => {
    const cacheDir = "./.cache/",
      response = await res.text(),
      data = JSON.parse(response),
      error = data.error || data.errors;

    if (error) {
      return catchError(error);
    }

    fs.existsSync(cacheDir) || (await fs.promises.mkdir(cacheDir));

    await fs.promises.writeFile(cacheDir + "CMS.json", response, "utf8");

    printMessage(
      "info",
      "Successfully fetched data from CMS and saved it to the cache"
    );

    return data;
  })
  .catch(catchError);

const CMS = {
  get(contentType, locale) {
    if (contentType === "all") {
      if (locale) {
        console.warn(`locale is ignored when the content type is "all"`);
      }

      return data;
    }

    const content = data[contentType];

    // if locale is specified, the returned data won't be wrapped with the "data" key
    if (locale) {
      if (Array.isArray(content.data)) {
        if (locale === "en") return content.data;

        return content.data
          .map((item) => {
            const localizations = item.attributes.localizations.data;

            const localizedItem = localizations.find(
              ({ attributes }) =>
                attributes.locale.substring(0, 2) === locale.substring(0, 2)
            );

            return localizedItem;
          })
          .filter(Boolean);
      }

      // if the content is not an array, the localized data won't be wrapped with the "attributes" key

      if (locale === "en") return content.data.attributes;

      return data[contentType].data.attributes.localizations.data.find(
        ({ attributes }) =>
          attributes.locale.substring(0, 2) === locale.substring(0, 2)
      ).attributes;
    }

    return content;
  },
};

async function catchError(error) {
  let cachedData;

  if (fs.existsSync("./.cache/CMS.json")) {
    cachedData = JSON.parse(
      await fs.promises.readFile("./.cache/CMS.json", "utf8")
    );

    printMessage(
      "error",
      "Failed to fetch data from CMS, serving from the cache"
    );
  } else {
    printMessage(
      "error",
      "Failed to fetch data from CMS, nothing found in cache!"
    );
  }

  console.error(error);

  return cachedData;
}

export default CMS;
