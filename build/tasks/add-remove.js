var gulp = require('gulp'),
    del = require('del');

var config = {
	dist: './dist',
	js: './assets/javascripts/',
    css: './assets/stylesheets/',
    distAssets: './dist/assets/' 
}

gulp.task('remove-bundles', function(callback) {
    var files = [config.dist +'/bundle.js', config.dist +'/bower-bundle.js', config.dist +'/css-bundle.css', config.dist +'/bower-css-bundle.css'];
    del.sync(files, {force: true});
    callback();
});
gulp.task('copy-index', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest(config.dist));
});

gulp.task('copy-fonts', function () {
   return gulp.src(['./assets/fonts/*', './assets/fonts/**/*'])
        .pipe(gulp.dest(config.dist + '/assets/fonts'));
});

gulp.task('copy-images', function () {
    return gulp.src(['./assets/images/*'])
        .pipe(gulp.dest(config.dist + '/assets/images'));
});

gulp.task('copy-templates', function () {
    return gulp.src('./assets/templates/*')
        .pipe(gulp.dest(config.dist + '/assets/templates'));
});
gulp.task('copy-libs', function () {
    return gulp.src('./libs/*')
        .pipe(gulp.dest(config.dist + '/libs'));
});