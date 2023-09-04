import path from 'path';
import url from 'url';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const {resolve, dirname} = path;
const {fileURLToPath} = url;
// workaround https://stackabuse.com/bytes/fix-dirname-is-not-defined-in-es-module-scope-in-javascript-node/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: resolve(__dirname, '../src/index.tsx'),
  mode: 'production',
  context: process.cwd(), // to automatically find tsconfig.json
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          name: 'node_vendors', // part of the bundle name and
          // can be used in chunks array of HtmlWebpackPlugin
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: 'all',
          minSize: 0,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new Dotenv({systemvars: true, expand: true}),
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
      excludeWarnings: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '../src/index.html'),
    }),
    new FaviconsWebpackPlugin(resolve(__dirname, '../src/logo.svg')),
    new CleanWebpackPlugin(),
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
