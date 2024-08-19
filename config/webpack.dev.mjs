/* 项目开发、预览的webpack配置 */
import path from 'node:path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { metaHelper } from '@sweet-milktea/utils';
import { basicConfig } from './basic.config.mjs';

const { __dirname } = metaHelper(import.meta.url);

export default merge(basicConfig, {
  entry: {
    index: path.join(__dirname, '../example/index.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../example/index.ejs'),
      filename: 'index.html'
    })
  ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(__dirname, '../.cache/webpackCache')
  }
});