import path from 'path';

export default {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types'
  ],
  entry: {
    app: [path.join(__dirname, '../../test/app.js')]
  },
  output: { publicPath: '/' },
  externals: {
    mocha: 'window.mocha',
    chai: 'window.chai',
    describe: 'window.describe',
    it: 'window.it'
  },
  rules: [
    {
      test: /(dll\.js|mocha\.js|chai)/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'script/'
        }
      }]
    },
    {
      test: /mocha\.css/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'style/'
        }
      }]
    }
  ],
  js: {
    ecmascript: true,
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    exclude: /(dll\.js|node_modules|mocha|chai)/
  },
  sass: {
    modules: false,
    include: /(src|lib|example)/
  },
  css: {
    modules: false,
    include: /node_modules[\\/]antd/,
    exclude: /mocha/
  },
  html: [{ template: path.join(__dirname, '../../test/index.pug') }]
};