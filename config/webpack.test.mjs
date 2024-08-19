/* 测试用例的webpack配置 */
import path from 'node:path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { metaHelper } from '@sweet-milktea/utils';
import { basicConfig, rules, plugins } from './basic.config.mjs';

const { __dirname } = metaHelper(import.meta.url);

export default merge(basicConfig, {
  entry: {
    index: path.join(__dirname, '../test/index.js')
  },
  externals: {
    mocha: 'globalThis.mocha',
    chai: 'globalThis.chai',
    describe: 'globalThis.describe',
    it: 'globalThis.it'
  },
  module: {
    rules: [
      {
        test: /(mocha\.(js|css)|chai)/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../test/index.ejs'),
      filename: 'index.html'
    })
  ]
});