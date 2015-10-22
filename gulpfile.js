var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    hint = require('gulp-jshint'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');

gulp.task('sass', function() {
    gulp.src('src/sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest('src/stylesheets'));
});

gulp.task('lint', function(){
  gulp.src('src/app/**/*.js')
    .pipe(hint())
    .pipe(hint.reporter('default'));
});

gulp.task('server', ['sass', 'lint'], function(){
  
  gulp.src('src')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false
    }));

});

gulp.task('watch', ['server'], function(){
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/app/**/*.js', ['lint']);
});

gulp.task('serve', ['server', 'watch']);

gulp.task('default', ['serve']);

gulp.task('sass', function() {
    gulp.src('src/sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest('src/stylesheets'));
});

gulp.task('useref', ['sass'], function(){
  var assets = useref.assets();
 
  return gulp.src('src/index.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist/client'));
});

gulp.task('html', function(){
  gulp.src('src/app/partials/*.html')
    .pipe(gulp.dest('dist/client/app/partials'));
});

// gulp.task('build:server', function(){
//   gulp.src('server.js')
//     .pipe(gulp.dest('dist'));
// });

gulp.task('serve:build', function(){
  gulp.src('dist/client')
    .pipe(server({
      livereload: false,
      directoryListing: false,
      open: false
    }));
});

gulp.task('build', ['useref', 'html', 'build:server']);

gulp.task('clean', function(){
  return del(['dist/**/*']);
});