/* 项目开发、预览的webpack配置 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { basicConfig, rules, plugins } = require('./basic.config');

module.exports = {
  ...basicConfig,
  entry: {
    app: path.join(__dirname, '../example/index.js')
  },
  module: {
    rules
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../example/index.ejs'),
      filename: 'index.html'
    })
  ]
};