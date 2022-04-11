import path from 'node:path';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import { metaHelper } from '@sweet-milktea/utils';
import babelConfig from './babel.config.mjs';

const { __dirname } = metaHelper(import.meta.url);

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
  }
};

/* rules */
export const rules = [
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
            'react-refresh/babel',
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css'
              }
            ]
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
            localIdentName: '[path][name]__[local]___[hash:base64:5]'
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            fiber: false
          }
        }
      }
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
export const plugins = [
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/
  }),
  new ReactRefreshWebpackPlugin({
    overlay: false
  }),
  new AntdDayjsWebpackPlugin({
    plugins: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekday',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'localizedFormat'
    ],
    replaceMoment: true,
    preset: 'antd'
  })
];