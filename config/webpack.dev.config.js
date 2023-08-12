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
  mode: 'development',
  entry: resolve(__dirname, '../src/index.tsx'),
  context: process.cwd(), // to automatically find tsconfig.json
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 4001,
    historyApiFallback: true,
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
  plugins: [
    new Dotenv({systemvars: true}),
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
