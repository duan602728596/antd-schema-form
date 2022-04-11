import gulp from 'gulp';
import typescript from 'gulp-typescript';
import gulpDartSass from 'gulp-dart-sass';
import filter from 'gulp-filter';
import merge from 'merge2';
import sass from 'sass';
import tsconfig from './tsconfig.json' assert { type: 'json' };
import tsconfigES5 from './tsconfig.es5.json' assert { type: 'json' };

gulpDartSass.compiler = sass;

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
    .pipe(typescript({
      ...tsconfigES5.compilerOptions,
      ...typescriptConfig
    }));

  return merge([
    result.js.pipe(gulp.dest(libPath)),
    result.dts
      // 不输出warning.d.ts，因为是空文件
      .pipe(filter((file) => !/warning\.d\.ts/.test(file.path), {
        restore: false
      }))
      .pipe(gulp.dest(libPath))
  ]);
}

/* es */
function proEsProject() {
  const result = gulp.src(tsSrc)
    .pipe(typescript({
      ...tsconfig.compilerOptions,
      ...typescriptConfig
    }));

  return merge([
    result.js.pipe(gulp.dest(esPath)),
    result.dts
      // 不输出warning.d.ts，因为是空文件
      .pipe(filter((file) => !/warning\.d\.ts/.test(file.path), {
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
    .pipe(gulpDartSass({
      outputStyle: 'compressed'
    }).on('error', gulpDartSass.logError))
    .pipe(gulp.dest(stylePath));
}

export default gulp.parallel(proLibProject, proEsProject, proSassProject, copy);