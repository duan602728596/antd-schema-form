/* 项目开发、预览的webpack配置 */
import path from 'path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { metaHelper } from '@sweet-milktea/utils';
import { basicConfig, rules, plugins } from './basic.config.mjs';

const { __dirname } = metaHelper(import.meta.url);
const config = {
  module: {
    rules
  },
  plugins
};

export default merge(basicConfig, config, {
  entry: {
    index: path.join(__dirname, '../example/index.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../example/index.ejs'),
      filename: 'index.html'
    })
  ]
});