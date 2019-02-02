const process = require('process');
const gulp = require('gulp');
const typescript = require('gulp-typescript');
const sass = require('gulp-sass');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const tsconfig = require('./tsconfig.json');
const tsconfigES5 = require('./tsconfig.es5.json');

const isDevelopment = process.env.NODE_ENV === 'development';

// 文件目录地址
const tsSrc = 'src/**/*.{ts,tsx}';
const sassSrc = 'src/style/**/*.sass';
const libFilesPath = 'lib/**/*.js';
const libPath = 'lib';
const esFilesPath = 'es/**/*.js';
const esPath = 'es';
const styleFilesPath = 'style/**/*.css';
const stylePath = 'style';

/* ----- 开发环境编译 ----- */
/* lib */
function devLibProject(){
  const result = gulp.src(tsSrc)
    .pipe(changed(libFilesPath))
    .pipe(plumber())
    .pipe(typescript(tsconfigES5.compilerOptions));

  return result.js.pipe(gulp.dest(libPath));
}

/* es */
function devEsProject(){
  const result = gulp.src(tsSrc)
    .pipe(changed(esFilesPath))
    .pipe(plumber())
    .pipe(typescript(tsconfig.compilerOptions));

  return result.js.pipe(gulp.dest(esPath));
}

/* sass */
function devSassProject(){
  return gulp.src(sassSrc)
    .pipe(changed(styleFilesPath))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(stylePath));
}

/* watch */
function watch(){
  gulp.watch(tsSrc, gulp.parallel(devLibProject, devEsProject));
  gulp.watch(sassSrc, devSassProject);
}

/* ----- 生产环境编译 ----- */
/* lib */
function proLibProject(){
  const result = gulp.src(tsSrc)
    .pipe(typescript(tsconfigES5.compilerOptions));

  return result.js.pipe(gulp.dest(libPath));
}

/* es */
function proEsProject(){
  const result = gulp.src(tsSrc)
    .pipe(typescript(tsconfig.compilerOptions));

  return result.js.pipe(gulp.dest(esPath));
}

/* sass */
function proSassProject(){
  return gulp.src(sassSrc)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(stylePath));
}

exports.default = isDevelopment
  ? gulp.series(gulp.parallel(devLibProject, devEsProject, devSassProject), watch)
  : gulp.parallel(proLibProject, proEsProject, proSassProject);