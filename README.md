# Typescript React HMR Chrome Extension Starter

A good modern starting point for building chrome extensions.

Getting HMR to work was a bit of a pain. For now I have locked `webpack-dev-server` to version 3.1.14 in `package.json`. This perhaps can change in the future.

## Technologies

Typescript, React, Webpack, Hot Module Replacement, React Hooks, Storybook, Prettier, Husky, Pretty Quick, E2E Testing via Puppeteer, Jest

## Gulp

Using gulp is perhaps an unusual choice for build tools in this day and age but IMO its still a good tool better than `nps` for more complex requirements such as building chrome extensions.

For best results install the gulp CLI globally:

`yarn global add gulp-cli`

Then you can explore the tasks you can run with:

`gulp --tasks`

.. and one one for example:

`gulp dev`

Dont be afraid of going in and changing things to how you like them. The starting point for all of this should be `scripts/index.ts`

## Prettier, Husky, Pretty-Quick

I prefer to use prettier over ts-lint or js-lint. I find those guys tend to get in the way too much. Prettier is simple and does everything I need. Setup your VS Code to format on every save, thank me later :)

I have added husky and pretty-quick in the mix so that prettier is run before each commit to enforce code standards.

## Storybook

This project supports storybook out of the gate. This is handy to develop your react components in isolation.

## E2E Tests

E2E tests are powered by puppeteer. Over some time I have developed a good way of runnings these and have thus included my microframework in here to help with that.

`gulp runE2ETests` or `yarn e2e`

I am running a custom reporter that only logs if a test fails. You can disable this by commenting out the reporters in `jest.e2e.config.js`.

## Env Vars

To include an environment variable in the build it must start with `REACT_APP` and then it will automatically be included.

## Uploading

This package supports automatic uploading to the chrome webstore too. Look in `scripts/upload` for instructions on how to get the keys to make this work.
