import {readdir, unlink, writeFileSync } from "fs";
import * as path from 'path';
import * as http from "http";
import * as https from "https";
import * as stream from "stream";
import fetch from "node-fetch";

const Stream = stream.Transform;

const url = "https://cms.dilmahtea.me";
const directory = './public/cms/uploads/';

// Read & Clean Directory First
readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

// Download Image Helper Function
const downloadImageFromURL = (url: string, filename: string, path: string) => {
  let client: typeof http | typeof https = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }

  client
    .request(url, function (response) {
      let data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        writeFileSync(path + filename, data.read());
      });
    })
    .end();
};

export interface Type {
  data : any;
  url: string;
  hash: string;
  ext: string;
  length: number;
  filter: any;
}

async function getImgData(): Promise<Type> {
  const response = await fetch(
    `${url}/api/upload/files`
  );
  return (await response.json()) as Promise<Type>
}
const data = await getImgData();

// Download Original Sized Image
for (let i = 0; i < data.length; i++) {
  const link = url + data[i].url;
  const name = data[i].hash + data[i].ext;
  downloadImageFromURL(link, name, directory);
}

// Skip Non-format Sized Image
var md = data.filter(function(item){
  return item.ext != ".svg";         
});

// Download Medium Sized Image
for (let i = 0; i < md.length; i++) {
  const link1 = url + md[i].formats.medium.url;
  const name1 = md[i].formats.medium.hash + md[i].formats.medium.ext;
  downloadImageFromURL(link1, name1, directory);
}

// Download Thumbnail Sized Image
for (let i = 0; i < md.length; i++) {
  const link1 = url + md[i].formats.thumbnail.url;
  const name1 = md[i].formats.thumbnail.hash + md[i].formats.thumbnail.ext;
  downloadImageFromURL(link1, name1, directory);
}