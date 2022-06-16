// craco.config.js
const path = require(`path`);
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.path.json');
const alias = require(`./src/config/aliases`);

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
      }),
    },
  },
  webpack: {
    alias: resolvedAliases,
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === "production") {
        // remove console in production
        const TerserPlugin = webpackConfig.optimization.minimizer.find(
          (i) => i.constructor.name === "TerserPlugin"
        );
        if (TerserPlugin) {
          TerserPlugin.options.minimizer.options.compress["drop_console"] = true;
        }
      }
      return webpackConfig;
    },
  },
};
