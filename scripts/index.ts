import { series, parallel } from "gulp";
import chalk from "chalk";
import { buildWebpack, watchWebpack } from "./webpack";
import { cleanDist } from "./clean";
import { config } from "./config";

console.log(chalk.cyan("---------------------------"));
console.log(chalk.cyanBright("Starting Gulp Script with Config:"));
console.log(chalk.green(JSON.stringify(config, null, 2)));
console.log(chalk.cyan("---------------------------"));

export const clean = series(cleanDist);

export const build = series(clean, buildWebpack);

export const watch = series(watchWebpack);

export const dev = series(clean, watch);
