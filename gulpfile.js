var gulp = require('gulp');
var scss = require('gulp-scss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
  scripts: 'src/js/*.js',
  vendorScripts: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/jquery-ui/ui/widget.js', 'node_modules/jquery-ui/ui/dialog.js', 'node_modules/jquery-ui/ui/unique-id.js', 'node_modules/jquery-ui/ui/widgets/position.js', 'node_modules/jquery-ui/ui/widgets/menu.js', 'node_modules/jquery-ui/ui/widgets/autocomplete.js', 'node_modules/jquery-ui/ui/keycode.js'],
  styles: 'src/scss/*.scss',
  vendorStyles: ['node_modules/foundation-sites/dist/css/foundation.min.css', 'node_modules/jquery-ui/themes/base/core.css', 'node_modules/jquery-ui/themes/base/autocomplete.css', 'node_modules/jquery-ui/themes/base/theme.css']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});


// Fetch & minimize all scripts
gulp.task('scripts', ['clean','vendor-scripts','app-scripts'], function() {});

// Fetch & minimize vendor scripts
gulp.task('vendor-scripts', function() {
  return gulp.src(paths.vendorScripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

// Fetch & minimize app scripts
gulp.task('app-scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', ['clean','vendor-styles','app-styles'], function() {});

gulp.task('vendor-styles', function () {
  return gulp.src(paths.vendorStyles)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('public/css'))
});

gulp.task('app-styles', function () {
  return gulp.src(paths.styles)
    .pipe(scss())
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/css'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['app-scripts']);
  gulp.watch(paths.styles, ['app-styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'styles']);
