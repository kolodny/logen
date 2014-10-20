var gulp = require('gulp');
var map = require('vinyl-map');
var compile = require('./compile.js');
var concat = require('gulp-concat-sourcemap');


gulp.task('build', function() {
  gulp.src(['src/start.js', 'src/**/!(end.js)*.js', 'src/end.js'])
    .pipe(map(function (code, filename) {
      return compile(code);
    }))
    .pipe(concat('logen.js'))
    .pipe(gulp.dest('dist'));
});
