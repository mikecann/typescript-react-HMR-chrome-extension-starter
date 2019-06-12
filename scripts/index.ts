import { series, parallel } from "gulp";
import chalk from "chalk";
import { buildWebpack, watchWebpack } from "./webpack";
import { cleanDist } from "./clean";
import { config } from "./config";
import { zipDist } from "./zip";
import { removeManifestKeyFromDist } from "./manifest";

console.log(chalk.cyan("---------------------------"));
console.log(chalk.cyanBright("Starting Gulp Script with Config:"));
console.log(chalk.green(JSON.stringify(config, null, 2)));
console.log(chalk.cyan("---------------------------"));

export const clean = cleanDist;

export const build = series(clean, buildWebpack, removeManifestKeyFromDist);

export const watch = watchWebpack;

export const dev = series(clean, watch);

export const zip = zipDist;

export * from "./upload";
