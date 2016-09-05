var gulp = require('gulp');
var bower = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

gulp.task('bower', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(bower())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('concat', function() {
  gulp.src(['lib/**/app.js', 'lib/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));  
});

gulp.task('sass', function() {
  gulp.src('lib/scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', function() {
  livereload.listen();

  gulp.watch(['lib/**/*', 'public/index.html', 'public/templates/*'], function() {
    runSequence(['concat', 'sass'], function() {
      livereload.reload('public/index.html');
    });
  });

  gulp.watch('bower.json', function() {
    runSequence('bower', function() {
      livereload.reload('public/index.html');
    });
  });
});
