/// <reference path="./types/write-file-webpack-plugin.ts" />

import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import merge from "webpack-merge";
import { Configuration } from "webpack";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const srcDir = "../src/";

const common: Configuration = {
  entry: {
    browserAction: path.join(__dirname, srcDir + "browserAction/index.ts"),
    options: path.join(__dirname, srcDir + "options/index.ts"),
    background: path.join(__dirname, srcDir + "background/index.tsx"),
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
        use: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ["../../dist/**/*"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin(
      [
        {
          from: ".",
          to: "../",
          ignore: ["*.html"],
          transform: function(content, path) {
            if (path.endsWith("manifest.json"))
              return Buffer.from(
                JSON.stringify(
                  {
                    ...JSON.parse(content.toString()),
                    //description: process.env.npm_package_description,
                    //version: process.env.npm_package_version,
                    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
                  },
                  null,
                  2
                )
              );

            return content;
          },
        },
      ],
      { context: "public" }
    ),
    new WriteFilePlugin(),
  ],
});

export const prodWebpackConfig = merge(common, {
  mode: "production",
});
