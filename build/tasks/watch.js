var gulp = require('gulp'),
  browserSync = require('browser-sync').create();
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 8001
  });
  gulp.watch("./index.html").on('change', browserSync.reload);
  gulp.watch("assets/templates/*.html").on('change', browserSync.reload);
  gulp.watch("assets/javascripts/**/*.js").on('change', browserSync.reload);
  gulp.watch("assets/stylesheets/*.min.css").on('change', browserSync.reload);
});