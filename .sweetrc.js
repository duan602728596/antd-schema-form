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
  js: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ],
      [
        'import-components-style',
        {
          components: {
            highlightjs: 'styles/github-gist.css',
            'antd-schema-form': 'style/antd-schema-form.css'
          }
        }
      ]
    ],
    exclude: /node_modules[\\/](?!antd-schema-form)/
  },
  sass: {
    include: /src/
  },
  css: {
    modules: false,
    include: /(node_modules[\\/]antd(-schema-form)?|highlightjs)/
  },
  html: [{ template: path.join(__dirname, 'src/index.pug') }]
};