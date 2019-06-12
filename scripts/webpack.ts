import webpack from "webpack";
import chalk from "chalk";
import path from "path";
import WebpackDevServer from "webpack-dev-server";
import { makeWebpackConfig } from "./webpack.config";
import { config } from "./config";

function wp(compiler: webpack.Compiler, mode: "run" | "watch") {
  return new Promise((resolve, reject) => {
    const cb: webpack.Compiler.Handler = (err, stats) => {
      if (err) {
        console.error(chalk.red("[webpack]"), err);
        return reject();
      }
      console.log(chalk.blue("[webpack]"), stats.toString({ colors: true }));
      resolve();
    };

    if (mode == "run") compiler.run(cb);
    else if (mode == "watch") compiler.watch({}, cb);
  });
}

export async function buildWebpack() {
  const mode =
    config.NODE_ENV == "development" || config.NODE_ENV == "production"
      ? config.NODE_ENV
      : "development";

  const compiler = webpack(makeWebpackConfig({ mode, buildNumber: config.BUILD_NUMBER }));
  return wp(compiler, "run");
}

export function watchWebpack() {
  const mode =
    config.NODE_ENV == "development" || config.NODE_ENV == "production"
      ? config.NODE_ENV
      : "development";

  const hmrPort = Number.parseInt(config.HMR_PORT);

  const compiler = webpack(makeWebpackConfig({ mode, hmrPort, buildNumber: config.BUILD_NUMBER }));

  var server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "../dist"),
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
  });

  server.listen(hmrPort);
}
