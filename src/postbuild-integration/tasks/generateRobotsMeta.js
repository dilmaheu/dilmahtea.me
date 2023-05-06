import dotenv from "dotenv";
import fs from "fs/promises";
import fetch from "node-fetch";

dotenv.config({ path: "./.env" });

const CMS_ENDPOINT = process.env.ASSETS_URL,
  ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const response = await fetch(`${CMS_ENDPOINT}/api/robots-text`, {
  method: "GET",
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

const robotsMetaData = await response.json();

const robotsTXT = robotsMetaData.data.attributes.Text;

await fs.writeFile("./dist/robots.txt", robotsTXT);