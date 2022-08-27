import fs from "fs";

const queryModules = import.meta.globEager("../queries/partials/*.js");

const queryRegex = /^\s*{(.*)}\s*$/s;

const fullQuery =
  "{" +
  Object.keys(queryModules)
    .map((key) => {
      const query = queryModules[key].default;

      const [, queryContent] = queryRegex.exec(query);

      return queryContent;
    })
    .join("") +
  "}";

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
    const data = await res.text();

    await fs.promises.writeFile("./.cache/CMS.json", data, "utf8");

    return JSON.parse(data);
  })
  .catch(async (error) => {
    if (fs.existsSync("./.cache/CMS.json")) {
      const data = await fs.promises.readFile("./.cache/CMS.json", "utf8");

      return JSON.parse(data);
    }

    throw error;
  });

const CMS = {
  async get(contentType) {
    if (contentType === "all") return data;

    return data[contentType];
  },
};

export default CMS;
