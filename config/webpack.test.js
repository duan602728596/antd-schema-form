/* 测试用例的webpack配置 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { basicConfig, rules, plugins } = require('./basic.config');

module.exports = {
  ...basicConfig,
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
      ...rules,
      {
        test: /(mocha\.js|chai)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'script/'
            }
          }
        ]
      },
      {
        test: /mocha\.css/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'style/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../tests/index.ejs'),
      filename: 'index.html'
    })
  ]
};