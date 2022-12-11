import dotenv from "dotenv";
import fs from "fs/promises";
import fetch from "node-fetch";

dotenv.config({ path: "./.env" });

const CMS_ENDPOINT = process.env.ASSETS_URL,
  ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const response = await fetch(`${CMS_ENDPOINT}/api/security-text`, {
  method: "GET",
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});

const securityMetaData = await response.json();

const securityTXT = securityMetaData.data.attributes.Text;

await fs.writeFile("./dist/security.txt", securityTXT);

const secondaryFilePath = "./dist/.well-known/";
fs.mkdir(secondaryFilePath);

await fs.writeFile(secondaryFilePath + "security.txt", securityTXT);
