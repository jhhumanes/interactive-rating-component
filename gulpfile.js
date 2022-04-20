const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

const stylesBaseFilename = 'main';
const scriptsBaseFilename = 'app';

const scssTask = () => {
  return src(`./src/scss/${stylesBaseFilename}.scss`, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('./dist', { sourcemaps: '.' }));
}

const scssDevTask = () => {
  return src(`./src/scss/${stylesBaseFilename}.scss`, { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist', { sourcemaps: '.' }));
}

function jsTask() {
  return src(`./src/js/${scriptsBaseFilename}.js`, { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('./dist', { sourcemaps: '.' }));
}

const browserSyncServe = (cb) => {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
const browserSyncReload = (cb) => {
  browsersync.reload();
  cb();
}

const watchTask = () => {
  watch('./*.html', browserSyncReload);
  watch(
    ['./src/scss/**/*.scss', './src/js/**/*.js'],
    series(scssDevTask, jsTask, browserSyncReload)
  );
}

exports.default = series(scssDevTask, jsTask, browserSyncServe, watchTask);

exports.build = series(scssTask, jsTask);
