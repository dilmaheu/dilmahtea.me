import dotenv from "dotenv";
import fs from "fs/promises";
import fetch from "node-fetch";

dotenv.config({ path: "./.env" });

const CMS_ENDPOINT = process.env.STRAPI_URL,
  STRAPI_ACCESS_TOKEN = process.env.STRAPI_ACCESS_TOKEN;

const response = await fetch(`${CMS_ENDPOINT}/api/security-text`, {
  method: "GET",
  headers: { Authorization: `Bearer ${STRAPI_ACCESS_TOKEN}` },
});

const securityMetaData = await response.json(),
  securityTXT = securityMetaData.data.attributes.Text;

await fs.mkdir("./dist/.well-known/", { recursive: true });

await Promise.all([
  await fs.writeFile("./dist/security.txt", securityTXT),
  await fs.writeFile("./dist/.well-known/security.txt", securityTXT),
]);
