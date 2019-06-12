/// <reference path="./types/write-file-webpack-plugin.ts" />

import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration } from "webpack";
import webpack from "webpack";
import WriteFilePlugin from "write-file-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { config } from "./config";

type Options = {
  mode?: "development" | "production";
  hmrPort?: number;
  buildNumber?: string;
};

export function makeWebpackConfig(options: Options): Configuration {
  const mode = options.mode || "development";
  const hmrPort = options.hmrPort || 9432;
  const buildNumber = options.buildNumber || "0";

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

      const version = existing.version + "." + buildNumber;

      return Buffer.from(
        JSON.stringify(
          {
            ...existing,
            name: existing.name + " - v" + version,
            version,
            content_security_policy: csp,
          },
          null,
          2
        )
      );
    }

    return content;
  }

  const entry = {
    browserAction: getEntry(path.join(__dirname, "../src/browserAction/index.tsx")),
    options: getEntry(path.join(__dirname, "../src/options/index.tsx")),
    background: getEntry(path.join(__dirname, "../src/background/index.tsx")),
    contentScript: getEntry(path.join(__dirname, "../src/contentScript/index.tsx")),
  };

  function getEntry(path: string) {
    if (mode == "development")
      return [
        `webpack-dev-server/client?http://localhost:${hmrPort}`,
        "webpack/hot/dev-server",
        path,
      ];

    return path;
  }

  function getHtmlPluginForEntry(entryName: keyof typeof entry) {
    return new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public", entryName + ".html"),
      filename: entryName + ".html",
      excludeChunks: Object.keys(entry).filter(k => k != entryName),
    });
  }

  function getHtmlPlugins() {
    return Object.keys(entry)
      .filter(e => e != "contentScript")
      .map(getHtmlPluginForEntry);
  }

  return {
    mode,
    entry,
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
    },
    // Borrowed from: https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
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
      ...getHtmlPlugins(),
      new webpack.DefinePlugin({
        "process.env": Object.keys(config)
          .filter(k => k.startsWith("REACT_APP"))
          .reduce((accum, key) => ({ ...accum, [key]: config[key] }), {}),
      }),
      new WriteFilePlugin(),
    ],
  };
}
