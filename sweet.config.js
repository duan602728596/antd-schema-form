const path = require('path');
const process = require('process');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
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
];

if (!isDevelopment) {
  plugins.unshift(['transform-react-remove-prop-types', { mode: 'remove', removeImport: true }]);
}

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
    plugins,
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
    }),
    new AntdDayjsWebpackPlugin({
      plugins: [
        'isSameOrBefore',
        'isSameOrAfter',
        'advancedFormat',
        'customParseFormat',
        'weekday',
        'weekYear',
        'weekOfYear',
        'isMoment',
        'localeData',
        'localizedFormat'
      ],
      replaceMoment: true,
      preset: 'antd'
    })
  ]
};