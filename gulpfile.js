var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    hint = require('gulp-jshint'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    del = require('del'),
    minifyHtml = require('gulp-minify-html'),
    replace = require('gulp-replace'),
    lr = require('gulp-livereload');

gulp.task('sass', function() {
    gulp.src('src/sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest('src/stylesheets'))
      .pipe(lr());
});

gulp.task('lint', function(){
  gulp.src(['src/app/**/*.js', 'server/**/*.js', 'server.js'])
    .pipe(hint())
    .pipe(hint.reporter('default'))
    .pipe(lr());
});

gulp.task('watch', ['sass', 'lint'], function(){
  lr.listen();
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch(['src/app/**/*.js', 'server/**/*.js', 'server.js'], ['lint']);
});

gulp.task('serve', ['watch']);

gulp.task('default', ['serve']);

gulp.task('clean', function(){
  return del(['dist/**/*']);
});

gulp.task('lint:build', function() {
    gulp.src(['src/app/**/*.js', 'server/**/*.js', 'server.js'])
    .pipe(hint())
    .pipe(hint.reporter('default'))
    .pipe(hint.reporter('fail'));
});

gulp.task('useref', ['sass', 'lint:build'], function(){
  var assets = useref.assets();

  return gulp.src('src/index.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist/client'));
});

gulp.task('html', ['useref'], function(){
  gulp.src('src/app/partials/**/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/client/app/partials'));
});

gulp.task('serverCode', ['html'], function(){
  gulp.src('server/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/server'));
});

gulp.task('serverFile', ['serverCode'], function(){
  gulp.src('server.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['serverFile']);
