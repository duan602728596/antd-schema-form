const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sass = require('gulp-sass');
const merge = require('merge2');
const tsconfig = require('./tsconfig.json');
const tsconfigES5 = require('./tsconfig.es5.json');

// 文件目录地址
const tsSrc = 'src/**/*.{ts,tsx}';
const dTsSrc = 'src/**/*.d.ts';
const sassSrc = 'src/style/**/*.sass';
const libPath = 'lib';
const esPath = 'es';
const stylePath = 'style';

/* ----- 生产环境编译 ----- */
/* lib */
function proLibProject() {
  const result = gulp.src(tsSrc)
    .pipe(typescript(tsconfigES5.compilerOptions));

  return merge([
    result.js.pipe(gulp.dest(libPath)),
    result.dts.pipe(gulp.dest(libPath))
  ]);
}

/* es */
function proEsProject() {
  const result = gulp.src(tsSrc)
    .pipe(typescript(tsconfig.compilerOptions));

  return merge([
    result.js.pipe(gulp.dest(esPath)),
    result.dts.pipe(gulp.dest(esPath))
  ]);
}

/* 拷贝d.ts */
function copy() {
  return gulp.src(dTsSrc)
    .pipe(gulp.dest(libPath))
    .pipe(gulp.dest(esPath));
}

/* sass */
function proSassProject() {
  return gulp.src(sassSrc)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(stylePath));
}

exports.default = gulp.parallel(proLibProject, proEsProject, proSassProject, copy);