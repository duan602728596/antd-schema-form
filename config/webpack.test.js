/* 测试用例的webpack配置 */
const path = require('path');
const merge = require('webpack-merge');
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
    app: path.join(__dirname, '../tests/index.js')
  },
  externals: {
    mocha: 'window.mocha',
    chai: 'window.chai',
    describe: 'window.describe',
    it: 'window.it'
  },
  module: {
    rules: [
      {
        test: /(mocha\.(js|css)|chai)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:5]:[ext]'
            }
          }
        ]
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