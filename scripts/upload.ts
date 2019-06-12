/// <reference path="./types/chrome-webstore-upload.ts" />

import { config } from "./config/base";
import up from "chrome-webstore-upload";
import { getBuiltZipPath } from "./zip";
import fs from "fs";

/**
 * To generate the keys required for this to work, follow this guide:
 * https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md
 */

async function upload(publishTarget: "default" | "trustedTesters") {
  if (
    !config.CHROME_WEBSTORE_CLIENT_ID ||
    !config.CHROME_WEBSTORE_CLIENT_SECRET ||
    !config.CHROME_WEBSTORE_REFRESH_TOKEN ||
    !config.EXTENSION_ID
  )
    throw new Error(
      `Cannot upload, missing either the CHROME_WEBSTORE_CLIENT_ID, CHROME_WEBSTORE_CLIENT_SECRET, CHROME_WEBSTORE_REFRESH_TOKEN or EXTENSION_ID. Ensure you have these set in config or are available in the env vars before continuing.`
    );

  const webStore = up({
    extensionId: config.EXTENSION_ID,
    clientId: config.CHROME_WEBSTORE_CLIENT_ID,
    clientSecret: config.CHROME_WEBSTORE_CLIENT_SECRET,
    refreshToken: config.CHROME_WEBSTORE_REFRESH_TOKEN,
  });

  const myZipFile = fs.createReadStream(getBuiltZipPath());
  const token = await webStore.fetchToken();

  console.log(`Loaded token: ` + token);

  console.log(`Uploading zip...`);

  await webStore.uploadExisting(myZipFile, token);

  console.log(`Upload complete, publishing to '${publishTarget}'.. `);

  await webStore.publish(publishTarget, token);

  console.log(`Published.`);
}

export async function uploadAndPublish() {
  return upload("default");
}

export async function uploadAndPublichToTrustedTesters() {
  return upload("trustedTesters");
}
