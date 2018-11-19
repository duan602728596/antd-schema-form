import path from 'path';
import process from 'process';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

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
          name: isDevelopment ? '[name].[ext]' : '[hash:5].[ext]',
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
    modules: false,
    include: /(src|lib|example)/
  },
  css: {
    modules: false,
    include: /node_modules[\\/]antd/
  },
  html: [{ template: path.join(__dirname, '../../example/index.pug') }]
};