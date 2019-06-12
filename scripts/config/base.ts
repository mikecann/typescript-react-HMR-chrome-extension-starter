/***
 * Use this file as a type-safe way to declare all the inputs to your system
 * rather than using process.env everywhere
 */

export const config = {
  NODE_ENV: "development",
  BUILD_NUMBER: "0",
  HMR_PORT: "9742", // This can be anything you like
  EXTENSION_ID: "naedglajdljhjafndembopgkedlgjnfn", // This is the id of the extension in the store and required for uploading

  // See the comments in upload.ts for instructions on how to get and use these
  CHROME_WEBSTORE_CLIENT_ID: "",
  CHROME_WEBSTORE_CLIENT_SECRET: "",
  CHROME_WEBSTORE_REFRESH_TOKEN: "",

  // These are for e2e tests
  NO_ONLY_TESTS: "false",
  VIEWPORT_WIDTH: "1024",
  VIEWPORT_HEIGHT: "768",

  // Anything that starts with "REACT_APP" will be included in the build
  REACT_APP_BUILD_NUMBER: "0",
};
