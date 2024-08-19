import path from 'node:path';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { metaHelper } from '@sweet-milktea/utils';
import babelConfig from './babel.config.mjs';

const { __dirname } = metaHelper(import.meta.url);

/* rules */
const rules = [
  {
    test: /.*\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: babelConfig
      }
    ],
    exclude: /(node_modules|mocha|chai)/
  },
  {
    test: /.*\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [
            'react-refresh/babel'
          ]
        }
      },
      'ts-loader'
    ],
    exclude: /node_modules/
  },
  {
    test: /.*\.s(a|c)ss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]__[local]___[hash:base64:5]',
            namedExport: false
          }
        }
      },
      'sass-loader'
    ],
    include: /(src|lib|example)/
  },
  {
    test: /.*\.css/,
    use: ['style-loader', 'css-loader'],
    include: /node_modules/,
    exclude: /mocha\.css/
  }
];

/* plugins */
const plugins = [
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/
  }),
  new ReactRefreshWebpackPlugin({
    overlay: false
  })
];

/* 基础配置 */
export const basicConfig = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules
  },
  plugins,
  experiments: {
    topLevelAwait: true
  }
};