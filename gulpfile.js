const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// 文件目录地址
const jsSrc = path.join(__dirname, 'src/**/*.js');
const sassSrc = path.join(__dirname, 'src/**/*.sass');
const libPath = path.join(__dirname, 'lib');

// bebel配置
const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { ie: 11, edge: 12, chrome: 40, firefox: 40 },
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

/* babel */
function babelProject(){
  return gulp.src(jsSrc)
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(libPath));
}

gulp.task('babelProject', babelProject);

/* sass */
function sassProject(){
  return gulp.src(sassSrc)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(libPath));
}

gulp.task('sassProject', sassProject);

gulp.task('default', ['babelProject', 'sassProject']);