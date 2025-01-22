import gulp from 'gulp';
import gulpTypescript from 'gulp-typescript';
import gulpSass from 'gulp-sass';
import gulpFilter from 'gulp-filter';
import merge from 'merge2';
import * as sassCompiler from 'sass';
import tsconfig from './tsconfig.json' with { type: 'json' };
import tsconfigES5 from './tsconfig.es5.json' with { type: 'json' };

const sass = gulpSass(sassCompiler);

// 文件目录地址
const tsSrc = 'src/**/*.{ts,tsx}';
const dTsSrc = 'src/**/*.d.ts';
const sassSrc = 'src/style/**/*.sass';
const libPath = 'lib';
const esPath = 'es';
const stylePath = 'style';

const typescriptConfig = {
  allowSyntheticDefaultImports: true,
  rootDir: '.'
};

/* ----- 生产环境编译 ----- */
/* lib */
function proLibProject() {
  const result = gulp.src(tsSrc)
    .pipe(gulpTypescript({
      ...tsconfigES5.compilerOptions,
      ...typescriptConfig
    }));

  return merge([
    result.js.pipe(gulp.dest(libPath)),
    result.dts
      // 不输出warning.d.ts，因为是空文件
      .pipe(gulpFilter((file) => !/warning\.d\.ts/.test(file.path), {
        restore: false
      }))
      .pipe(gulp.dest(libPath))
  ]);
}

/* es */
function proEsProject() {
  const result = gulp.src(tsSrc)
    .pipe(gulpTypescript({
      ...tsconfig.compilerOptions,
      ...typescriptConfig
    }));

  return merge([
    result.js.pipe(gulp.dest(esPath)),
    result.dts
      // 不输出warning.d.ts，因为是空文件
      .pipe(gulpFilter((file) => !/warning\.d\.ts/.test(file.path), {
        restore: false
      }))
      .pipe(gulp.dest(esPath))
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

export default gulp.parallel(proLibProject, proEsProject, proSassProject, copy);