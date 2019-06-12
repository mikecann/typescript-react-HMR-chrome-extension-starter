import { config as baseconfig } from "./base";

const conf = {
  ...baseconfig,
};

for (let key in process.env)
  if (conf.hasOwnProperty(key))
    conf[key] = process.env[key];

export const config = {
  ...conf,
};
