/// <reference path="./types/write-file-webpack-plugin.ts" />

import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration } from "webpack";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

type Options = {
  mode?: "development" | "production";
  hmrPort?: number;
};

export function makeWebpackConfig(options: Options): Configuration {
  const mode = options.mode || "production";
  const hmrPort = options.hmrPort || 9432;

  function transformFile(content: Buffer, path: string) {
    if (path.endsWith("manifest.json")) {
      const existing = JSON.parse(content.toString());
      const defaultCsp = "script-src 'self'; object-src 'self'";
      let csp: string = existing.content_security_policy || defaultCsp;

      if (mode == "development") {
        const index = csp.indexOf("script-src");
        if (index == -1) csp = "script-src 'self' 'unsafe-eval'; " + csp;
        else csp = csp.replace(";", " 'unsafe-eval';");
      }

      return Buffer.from(
        JSON.stringify(
          {
            ...existing,
            //description: process.env.npm_package_description,
            //version: process.env.npm_package_version,
            content_security_policy: csp,
          },
          null,
          2
        )
      );
    }

    return content;
  }

  function getEntry(path: string) {
    if (mode == "development")
      return [
        `webpack-dev-server/client?http://localhost:${hmrPort}`,
        "webpack/hot/dev-server",
        path,
      ];

    return path;
  }

  const config: Configuration = {
    mode,
    entry: {
      browserAction: getEntry(path.join(__dirname, "../src/browserAction/index.tsx")),
      options: getEntry(path.join(__dirname, "../src/options/index.tsx")),
      background: getEntry(path.join(__dirname, "../src/background/index.tsx")),
      contentScript: getEntry(path.join(__dirname, "../src/contentScript/index.tsx")),
    },
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
    },
    devtool: mode == "development" ? "inline-source-map" : undefined,
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
      alias:
        mode == "development"
          ? {
              "react-dom": "@hot-loader/react-dom",
            }
          : {},
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProgressPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new CopyPlugin(
        [
          {
            from: ".",
            to: ".",
            ignore: ["*.html"],
            transform: transformFile,
          },
        ],
        { context: "public" }
      ),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public", "browserAction.html"),
        filename: "browserAction.html",
        chunks: ["browserAction"],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public", "options.html"),
        filename: "options.html",
        chunks: ["options"],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public", "background.html"),
        filename: "background.html",
        chunks: ["background"],
      }),
      new WriteFilePlugin(),
    ],
  };

  return config;
}
