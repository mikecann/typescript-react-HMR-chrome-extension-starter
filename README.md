# Typescript React HMR Chrome Extension Starter

A good modern starting point for building chrome extensions.

Getting HMR to work was a bit of a pain. For now I have locked `webpack-dev-server` to version 3.1.14 in `package.json`. This perhaps can change in the future.

Using gulp is perhaps an unusual choice for build tools in this day and age but IMO its still a good tool better than `nps` for more complex requirements such as building chrome extensions.

This package supports automatic uploading to the chrome webstore too, super handy for CI work.

## Technologies

Typescript, React, Webpack, Hot Module Replacement, React Hooks

## Env Vars

To include an environment variable in the build it must start with `REACT_APP` and then it will automatically be included.
