import { series, parallel } from "gulp";
import webpack from "webpack";
import { rm, exec } from "shelljs";
import chalk from "chalk";
import { devWebpackConfig, prodWebpackConfig } from "./webpack.config";
import { buildWebpack, watchWebpack } from "./webpack";
import { cleanDist } from "./clean";

export const clean = series(cleanDist);

export const build = series(clean, buildWebpack);

export const watch = series(watchWebpack);

export const dev = series(watch);
