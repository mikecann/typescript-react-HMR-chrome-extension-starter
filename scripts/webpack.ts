import webpack from "webpack";
import chalk from "chalk";
import { devWebpackConfig, prodWebpackConfig } from "./webpack.config";
import path from "path";
import WebpackDevServer from "webpack-dev-server";
import { Configuration } from "webpack";

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
  const compiler = webpack(devWebpackConfig);
  return wp(compiler, "run");
}

export function watchWebpack() {
  const port = 3000;

  const entry = Object.keys(devWebpackConfig.entry!).reduce(
    (accum, curr) => ({
      ...accum,
      [curr]: [
        "webpack-dev-server/client?http://localhost:" + port,
        "webpack/hot/dev-server",
        devWebpackConfig.entry![curr],
      ],
    }),
    {}
  );

  const config: Configuration = {
    ...devWebpackConfig,
    entry,
  };

  // const config = config.entry[entryName] = [
  //   "webpack-dev-server/client?http://localhost:" + env.PORT,
  //   "webpack/hot/dev-server"
  // ].concat(config.entry[entryName]);

  const compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, "../dist"),
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
  });

  server.listen(port);

  //return wp(compiler, "watch");
}
