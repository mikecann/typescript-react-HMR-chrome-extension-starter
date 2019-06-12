/// <reference path="./types/storybook.ts" />

import storybook from "@storybook/react/standalone";

export async function startStorybookInDevMode() {
  storybook({
    mode: "dev",
    port: 9009,
    staticDir: ["./public"],
    configDir: "./scripts/storybookConfig",
  });
}
