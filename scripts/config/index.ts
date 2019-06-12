import { config as baseconfig } from "./base";

/***
 * Use this file as a type-safe way to declare all the inputs to your system
 * rather than using process.env everywhere.
 *
 */

const conf = {
  ...baseconfig,
};

// Only override base config items if they have been defined in the process.env
for (let key in process.env) if (conf.hasOwnProperty(key)) conf[key] = process.env[key];

export const config = {
  ...conf,
};
