import path from 'path';
import process from 'process';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

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
        'highlight.js/lib/core': '~highlight.js/styles/github.css',
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
    'react-router-dom',
    'react-helmet'
  ],
  entry: {
    index: [path.join(__dirname, 'src/index.js')]
  },
  output: { publicPath: isDevelopment ? '/' : 'https://duan602728596.github.io/antd-schema-form/' },
  javascript: {
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
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, 'build'),
        to: path.join(__dirname, 'dist')
      }]
    }),
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