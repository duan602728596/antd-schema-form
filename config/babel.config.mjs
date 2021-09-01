export default {
  presets: [
    ['@sweet-milktea/babel-preset-sweet', { env: { ecmascript: true } }]
  ],
  plugins: [
    [
      'import',
      {
        'libraryName': 'antd',
        'libraryDirectory': 'es',
        'style': 'css'
      }
    ],
    'react-refresh/babel'
  ]
};