const {resolve} = require('path');
const Webpack = require('webpack');
const {
  GITHUB_URL,
  getVersionString,
} = require('react-devtools-extensions/utils');
const {resolveFeatureFlags} = require('react-devtools-shared/buildUtils');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  console.error('NODE_ENV not set');
  process.exit(1);
}

const __DEV__ = NODE_ENV === 'development';

const EDITOR_URL = process.env.EDITOR_URL || null;

const DEVTOOLS_VERSION = getVersionString();

const babelOptions = {
  configFile: resolve(
    __dirname,
    '..',
    'react-devtools-shared',
    'babel.config.js',
  ),
};

const builtModulesDir = resolve(
  __dirname,
  '..',
  '..',
  'build',
  'oss-experimental',
);

module.exports = {
  mode: __DEV__ ? 'development' : 'production',
  devtool: __DEV__ ? 'eval-cheap-source-map' : 'source-map',
  entry: {
    backend: './src/backend.js',
    frontend: './src/frontend.js',
    hookNames: './src/hookNames.js',
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    library: {
      type: 'module',
    },
  },
  externals: {
    // react: 'react',
    // 'react-dom': 'react-dom',
    // 'react-dom/client': 'react-dom/client',
    // 'react-is': 'react-is',
    // scheduler: 'scheduler',

    react: resolve(builtModulesDir, 'react'),
    'react-debug-tools': resolve(builtModulesDir, 'react-debug-tools'),
    'react-devtools-feature-flags': resolveFeatureFlags('shell'),
    'react-dom/client': resolve(builtModulesDir, 'react-dom/unstable_testing'),
    'react-dom': resolve(builtModulesDir, 'react-dom'),
    'react-is': resolve(builtModulesDir, 'react-is'),
    scheduler: resolve(builtModulesDir, 'scheduler'),
  },
  node: {
    global: false,
  },
  resolve: {
    alias: {
      'react-devtools-feature-flags': resolveFeatureFlags('inline'),
    },
  },
  experiments: {
    outputModule: true
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new Webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new Webpack.DefinePlugin({
      __DEV__,
      __EXPERIMENTAL__: true,
      __EXTENSION__: false,
      __PROFILE__: false,
      __TEST__: NODE_ENV === 'test',
      'process.env.DEVTOOLS_PACKAGE': `"react-devtools-inline"`,
      'process.env.DEVTOOLS_VERSION': `"${DEVTOOLS_VERSION}"`,
      'process.env.EDITOR_URL': EDITOR_URL != null ? `"${EDITOR_URL}"` : null,
      'process.env.GITHUB_URL': `"${GITHUB_URL}"`,
      'process.env.NODE_ENV': `"${NODE_ENV}"`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'workerize-loader',
            options: {
              inline: true,
              name: '[name]',
            },
          },
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
};
