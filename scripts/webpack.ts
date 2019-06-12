import webpack from "webpack";
import chalk from "chalk";
import path from "path";
import WebpackDevServer from "webpack-dev-server";
import { Configuration } from "webpack";
import { makeWebpackConfig } from "./webpack.config";

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
  const compiler = webpack(makeWebpackConfig({ mode: "production" }));
  return wp(compiler, "run");
}

export function watchWebpack() {
  const hmrPort = 9624;
  const config = makeWebpackConfig({ mode: "development", hmrPort });
  const compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "../dist"),
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
  });

  server.listen(hmrPort);

  //return wp(compiler, "watch");
}
