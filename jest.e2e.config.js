module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/e2e/?(*.)+(spec|test).[t]s?(x)"],
  clearMocks: true,
  roots: ["<rootDir>/test/e2e"],
  verbose: false,
  bail: true,
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsConfig: {
        jsx: "react",
      },
    },
  },
  // reporters: [
  //   "<rootDir>/test/reporters/log-on-fail-reporter.js",
  //   "<rootDir>/test/reporters/summary.js",
  // ],
};
