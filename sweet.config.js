const path = require('path');
const process = require('process');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types',
    '@reduxjs/toolkit',
    'react-redux',
    'reselect',
    'react-router',
    'react-router-dom',
    'history',
    'react-helmet'
  ],
  entry: {
    index: [path.join(__dirname, 'src/index.js')]
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
            'highlight.js/lib/core': '~highlight.js/styles/github-gist.css',
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
    include: /node_modules/
  },
  html: [{ template: path.join(__dirname, 'src/index.pug') }],
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['json']
    })
  ]
};