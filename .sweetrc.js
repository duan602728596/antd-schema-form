const path = require('path');
const process = require('process');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions',
    'immutable',
    'redux-immutable',
    'reselect',
    'react-helmet'
  ],
  entry: {
    app: [path.join(__dirname, 'src/index.js')]
  },
  output: { publicPath: isDevelopment ? '/' : 'https://duan602728596.github.io/antd-schema-form/' },
  loaders: {
    svg: {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: '@svgr/webpack',
          options: { babel: false, icon: true }
        }
      ]
    }
  },
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
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    exclude: /(dll\.js|node_modules[\\/](?!antd-schema-form))/
  },
  sass: { include: /src/ },
  css: {
    modules: false,
    include: /(node_modules[\\/]antd(-schema-form)?|highlightjs)/
  },
  html: [{ template: path.join(__dirname, 'src/index.pug') }]
};
