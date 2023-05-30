import gulp from 'gulp';
import { deleteAsync } from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'mqpacker';
import minify from 'gulp-csso';
import rename from 'gulp-rename';
import squoosh from 'gulp-libsquoosh';
import rollup from 'gulp-better-rollup';
import sourcemaps from 'gulp-sourcemaps';
import mocha from 'gulp-mocha';
import browser from 'browser-sync';

export const test = () => {
  return gulp.src(['js/**/*.test.js'], { read: false })
    .pipe(mocha({
      require: ['babel-core/register'],
      reporter: 'spec'
    }));
}

const clean = () => {
  return deleteAsync('build');
};

const sass = gulpSass(dartSass);
const styles = () => {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      mqpacker({sort: true}),
    ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
};

const scripts = () => {
  return gulp.src('js/main.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, 'iife'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/js/'));
}

const optimizeImages = () => {
  return gulp.src('build/img/**/*.{jpg,png,gif}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
};

const copyHtml = () => {
  return gulp.src('*.{html,ico}')
    .pipe(gulp.dest('build'));
}

const copy = (done) => {
  gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/*.*'
  ], {
    base:'.'
  })
    .pipe(gulp.dest('build'))
    done();
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: './build'
    },
    notify: false,
    open: true,
    port: 3502,
    cors: true,
    ui: false
  });
  done();
};

const reload = (done) => {
  browser.reload();
  done();
};

const watcher = () => {
  gulp.watch('sass/**/*.{scss,sass}', gulp.series(styles));
  gulp.watch('js/**/*.js', gulp.series(scripts));
  gulp.watch('*.html', gulp.series(copyHtml, reload));
}

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    scripts,
    copyHtml
  ),
);

export default gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    scripts,
    copyHtml
  ),
  gulp.series(
    server,
    watcher
  ));
