/// <reference path="./types/write-file-webpack-plugin.ts" />

import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import merge from "webpack-merge";
import { Configuration } from "webpack";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const srcDir = "../src/";

const common: Configuration = {
  entry: {
    browserAction: path.join(__dirname, srcDir + "browserAction/index.ts"),
    options: path.join(__dirname, srcDir + "options/index.ts"),
    background: path.join(__dirname, srcDir + "background/index.ts"),
    contentScript: path.join(__dirname, srcDir + "contentScript/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    //new CopyPlugin([{ from: ".", to: "../" }], { context: "public" }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public", "browserAction.html"),
      filename: "../browserAction.html",
      chunks: ["browserAction"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public", "options.html"),
      filename: "../options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public", "background.html"),
      filename: "../background.html",
      chunks: ["background"],
    }),
  ],
};

export const devWebpackConfig = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin(), new WriteFilePlugin()],
});

export const prodWebpackConfig = merge(common, {
  mode: "production",
});
