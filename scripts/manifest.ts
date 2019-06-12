import fs from "fs";

const distManifestPath = `${__dirname}/../dist/manifest.json`;

export async function removeManifestKeyFromDist() {
  if (!doesManifestExistInDist())
    throw new Error("cannot remove manifest key from dist when it doesnt exist");

  const json = getManifestFromDist();
  json.key = undefined;
  fs.writeFileSync(distManifestPath, JSON.stringify(json, null, 2));
}

export function getManifestFromDist(): chrome.runtime.Manifest {
  if (!doesManifestExistInDist())
    throw new Error(
      `Cannot get manifest from dist when it doesnt exist. Path: '${distManifestPath}'`
    );

  return JSON.parse(fs.readFileSync(distManifestPath, { encoding: "utf8" }));
}

export function doesManifestExistInDist() {
  return fs.existsSync(distManifestPath);
}
