var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    hint = require('gulp-jshint'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    del = require('del'),
    replace = require('gulp-replace');

gulp.task('sass', function() {
    gulp.src('src/sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest('src/stylesheets'));
});

// gulp.task('replace:serve', function(){
//   gulp.src('src/app/app.js')
//     .pipe(replace('https://bookofrecipes.firebaseio.com/', 'https://bookofrecipesstaging.firebaseio.com/'))
//     .pipe(gulp.dest('src/app'));
// });

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

gulp.task('watch', ['sass', 'lint'], function(){
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/app/**/*.js', ['lint']);
});

gulp.task('serve', ['watch']);

gulp.task('default', ['serve']);

gulp.task('clean', function(){
  return del(['dist/**/*']);
});

gulp.task('sass', function() {
    gulp.src('src/sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest('src/stylesheets'));
});

// gulp.task('replace:build', function(){
//   gulp.src('src/app/app.js')
//     .pipe(replace('https://bookofrecipesstaging.firebaseio.com/', 'https://bookofrecipes.firebaseio.com/'))
//     .pipe(gulp.dest('src/app'));
// });

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

gulp.task('html', ['useref'], function(){
  gulp.src('src/app/partials/*.html')
    .pipe(gulp.dest('dist/client/app/partials'));
});

gulp.task('serve:build', function(){
  gulp.src('dist/client')
    .pipe(server({
      livereload: false,
      directoryListing: false,
      open: false
    }));
});

gulp.task('build', ['html']);
