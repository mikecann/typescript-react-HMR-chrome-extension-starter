const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (baseConfig, env, config) => {
  config.externals = ["child_process", "fs"];
  //config.target = "node";
  //(config.externals = [nodeExternals()]), // in order to ignore all modules in node_modules folder
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          configFileName: "tsconfig.storybook.json",
        },
      },
    ],
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
