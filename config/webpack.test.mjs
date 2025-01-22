/* 测试用例的webpack配置 */
import path from 'node:path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { metaHelper } from '@sweet-milktea/utils';
import { basicConfig } from './basic.config.mjs';

const { __dirname } = metaHelper(import.meta.url);

export default merge(basicConfig, {
  entry: {
    index: path.join(__dirname, '../test/index.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../test/index.ejs'),
      filename: 'index.html'
    })
  ],
  stats: {
    warningsFilter: /Critical dependency: the request of a dependency is an expression/i
  }
});