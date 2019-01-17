import path from 'path';

export default {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types'
  ],
  entry: {
    app: [path.join(__dirname, '../../example/app.js')]
  },
  output: { publicPath: '/' },
  rules: [
    {
      test: /dll\.js/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'script/'
        }
      }]
    }
  ],
  js: {
    ecmascript: true,
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    exclude: /(dll\.js|node_modules)/
  },
  sass: {
    include: /(src|lib|example)/
  },
  css: {
    modules: false,
    include: /node_modules[\\/]antd/
  },
  html: [{ template: path.join(__dirname, '../../example/index.pug') }]
};