const {
  resolve
} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: resolve(__dirname, '../src/index.tsx'),
  // mode: 'development',
  context: process.cwd(), // to automatically find tsconfig.json
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    // clientLogLevel: 'warning',
    // open: true,
    historyApiFallback: true,
    // stats: 'errors-only',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: [{
        loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
      },
      {
        loader: 'sass-loader', // compiles Sass to CSS
      },
      ],
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new ESLintPlugin({
      context: resolve(__dirname, '../src'),
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        async: true,
        configFile: resolve(__dirname, '../tsconfig.json'),
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '../src/index.html'),
    }),
    new FaviconsWebpackPlugin(resolve(__dirname, '../src/logo.svg')),
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};