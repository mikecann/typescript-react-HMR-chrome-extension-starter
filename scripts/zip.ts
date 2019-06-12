/// <reference path="./types/zip-folder.ts" />

import fs from "fs";
import zipf from "zip-folder";
import { getManifestFromDist } from "./manifest";

export function getBuiltZipPath() {
  const manifest = getManifestFromDist();
  return `${__dirname}/../built/${manifest.name.split(" ").join("-")}.${manifest.version}.zip`;
};

export function zipDist() {
  const zipfilepath = getBuiltZipPath();
  const dirname = require("path").dirname(zipfilepath);
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
  return new Promise((resolve, reject) => {
    zipf(`${__dirname}/../dist`, zipfilepath, (err: any) => {
      if (err) reject(err);
      else resolve("done");
    });
  });
}
