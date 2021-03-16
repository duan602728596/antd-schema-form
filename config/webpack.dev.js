/* 项目开发、预览的webpack配置 */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { basicConfig, rules, plugins } = require('./basic.config');

const config = {
  module: {
    rules
  },
  plugins
};

module.exports = merge(basicConfig, config, {
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