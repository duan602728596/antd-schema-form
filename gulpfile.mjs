import process from 'node:process';
import { spawn } from 'node:child_process';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass';
import { metaHelper } from '@sweet-milktea/utils';

const sass = gulpSass(sassCompiler);
const { __dirname } = metaHelper(import.meta.url);
const isWindows = process.platform === 'win32';

// 文件目录地址
const dTsSrc = 'src/**/*.d.ts';
const sassSrc = 'src/style/**/*.sass';
const libPath = 'lib';
const esPath = 'es';
const stylePath = 'style';

/**
 * 执行命令
 * @param { string } cmd - 命令
 * @param { Array<string> } args - 参数
 * @param { string } cwdPath - 文件夹
 */
function command(cmd, args, cwdPath) {
  return new Promise((resolve, reject) => {
    const spawnOptions = {
      stdio: 'inherit',
      cwd: cwdPath
    };

    if (isWindows) spawnOptions.shell = true;

    const child = spawn(cmd, args, spawnOptions);

    child.on('close', function(code) {
      resolve();
    });

    child.on('error', function(error) {
      reject(error);
    });
  });
}

const npm = isWindows ? 'npm.cmd' : 'npm';

/* ----- 生产环境编译 ----- */
/* lib */
async function proLibProject() {
  await command('npm', ['run', 'build:ts:lib'], __dirname);
}

/* es */
async function proEsProject() {
  await command('npm', ['run', 'build:ts:es'], __dirname);
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