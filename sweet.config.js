import path from 'node:path';
import process from 'node:process';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
  [
    'import-components-style',
    {
      components: {
        'highlight.js/lib/core': '~highlight.js/styles/github.css',
        'antd-schema-form': 'style/antd-schema-form.css'
      }
    }
  ]
];

module.exports = {
  frame: 'react',
  dll: [
    '@reduxjs/toolkit',
    'react',
    'react-dom/client',
    'react-helmet',
    'react-redux',
    'react-router-dom',
    'reselect'
  ],
  entry: {
    index: [path.join(__dirname, 'src/index.js')]
  },
  output: { publicPath: isDevelopment ? '/' : 'https://duan602728596.github.io/antd-schema-form/' },
  javascript: {
    plugins,
    exclude: /node_modules/
  },
  sass: {
    include: /src/
  },
  css: {
    include: /node_modules/
  },
  html: [{ template: path.join(__dirname, 'src/index.pug') }],
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'build'),
        to: path.join(__dirname, 'dist')
      }]
    }),
    new MonacoWebpackPlugin({
      languages: ['json']
    })
  ]
};