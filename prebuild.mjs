import { writeFileSync } from 'fs';
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config({ path: './.env' });
 
const url =  process.env.Assets_URL,
 auth =  process.env.ACCESS_TOKEN;

const directory = './public/robots.txt';

async function getData() {
  const response = await fetch(
    `${url}/api/robots-text`, {
        method:"GET",
        headers: {"Authorization": `Bearer ${auth}`}
      }
  );
  return await response.json()
}
const parsed = await getData();

const text = parsed.data.attributes.Text;

try{
  const data = writeFileSync(directory, text); 
  }catch(err){
  console.log(err);
};
