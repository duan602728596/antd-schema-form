module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': 3,
        'helpers': true,
        'regenerator': true,
        'useESModules': true
      }
    ],
    'react-refresh/babel',
    [
      'import',
      {
        'libraryName': 'antd',
        'libraryDirectory': 'es',
        'style': 'css'
      }
    ]
  ]
};