/* 测试用例的webpack配置 */
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
    index: path.join(__dirname, '../tests/index.js')
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
      template: path.join(__dirname, '../tests/index.ejs'),
      filename: 'index.html'
    })
  ]
});