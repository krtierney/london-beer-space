var gulp = require('gulp');
var bower = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');

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

gulp.task('compress', function() {
  gulp.src('public/js/app.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/js'))
});

gulp.task('minify-css', function() {
  gulp.src('public/css/app.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css'))
});

gulp.task('replace:prod', function() {
  gulp.src('public/index.html')
    .pipe(replace('app.js', 'app.min.js'))
    .pipe(replace('app.css', 'app.min.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('replace:dev', function() {
  gulp.src('public/index.html')
    .pipe(replace('app.min.js', 'app.js'))
    .pipe(replace('app.min.css', 'app.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('build', function() {
  runSequence(['bower', 'sass', 'concat', 'compress', 'minify-css', 'replace:prod'], function() {
    livereload.reload('public/index.html');
  });
});

gulp.task('default', ['bower', 'sass', 'concat', 'replace:dev'], function() {
  
  livereload.listen();

  gulp.watch(['lib/js/**/*', 'lib/scss/**/*'], function() {
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
