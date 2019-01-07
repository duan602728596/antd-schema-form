const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// 文件目录地址
const jsSrc = path.join(__dirname, 'src/**/*.js');
const sassSrc = path.join(__dirname, 'src/style/**/*.sass');
const libPath = path.join(__dirname, 'lib');
const esPath = path.join(__dirname, 'es');
const stylePath = path.join(__dirname, 'style');

// bebel配置
const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { ie: 11, edge: 12, chrome: 62, firefox: 56 },
        debug: false,
        modules: false,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties'
  ]
};

// babel es配置
const babelEsConfig = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: true
      }
    ]
  ]
};

/* babel */
function babelProject(){
  return gulp.src(jsSrc)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(libPath));
}

/* babel es */
function babelEsProject(){
  return gulp.src(jsSrc)
    .pipe(babel(babelEsConfig))
    .pipe(gulp.dest(esPath));
}

/* sass */
function sassProject(){
  return gulp.src(sassSrc)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(stylePath));
}

exports.default = gulp.series(gulp.parallel(babelProject, babelEsProject, sassProject));