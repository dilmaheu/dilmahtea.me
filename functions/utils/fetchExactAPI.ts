import type { ENV } from "./types";

import { XMLParser as XMLParserConstructor } from "fast-xml-parser";

const XMLParser = new XMLParserConstructor({ parseTagValue: false });

const fetchExactAPI = async (
  method: string,
  url: string,
  env: ENV,
  data?: any,
) =>
  fetch(url.startsWith("https://") ? url : env.EXACT_API_ENDPOINT + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await env.EXACT_TOKENS.get("ACCESS_TOKEN")}`,
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    try {
      var xml = XMLParser.parse(await res.text());
    } catch (error) {
      if (!res.ok) throw new Error(res.status + " " + res.statusText);
    }

    JSON.stringify(xml, (_, value) => {
      const error = value && (value["error"] || value["d:Errors"]);

      if (error) throw new Error(error.message);

      return value;
    });

    return xml;
  });

export default fetchExactAPI;
