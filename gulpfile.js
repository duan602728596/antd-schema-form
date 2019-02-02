const path = require('path');
const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sass = require('gulp-sass');
const tsconfig = require('./tsconfig.json');
const tsconfigES3 = require('./tsconfig.es3.json');

// 文件目录地址
const tsSrc = 'src/**/*.{ts,tsx}';
const sassSrc = 'src/style/**/*.sass';
const libPath = 'lib';
const esPath = 'es';
const stylePath = 'style';

/* lib */
function libProject(){
  const result = gulp.src(tsSrc)
    .pipe(typescript(tsconfigES3.compilerOptions));

  return result.js.pipe(gulp.dest(libPath));
}

/* es */
function esProject(){
  const result = gulp.src(tsSrc)
    .pipe(typescript(tsconfig.compilerOptions));

  return result.js.pipe(gulp.dest(esPath));
}

/* sass */
function sassProject(){
  return gulp.src(sassSrc)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(stylePath));
}

exports.default = gulp.series(gulp.parallel(libProject, esProject, sassProject));