var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    bowerMain = require('bower-main');

var config = {
	dist: './dist',
	js: './assets/javascripts/',
    css: './assets/stylesheets/',
    distAssets: './dist/assets/' 
}

var jsFiles = gulp.src([config.js + '**/*.js', config.js + '*.js']);
var bowerMainJavaScriptFiles = bowerMain('js','min.js');
var cssFiles = gulp.src([config.css + '*.css', config.css + '*.min.css']);
var bowerMainCssFiles = bowerMain('css','min.css');
// var bowerJsFiles = gulp.src(bowerFiles(paths: {bowerDirectory: './bower_components',bowerJson: './bower.json'}));
var bowerJsFiles = gulp.src(bowerMainJavaScriptFiles.normal);
var bowerCssFiles = gulp.src(bowerMainCssFiles.normal);
gulp.task('js-uglify', function(){
    return jsFiles.pipe(gp_concat('bundle.js'))
        .pipe(gulp.dest(config.dist))
        .pipe(gp_rename('dependencies.min.js'))
        .pipe(gp_uglify())
        // .on('error', function (err) { 
        // 	console.log("error>>>>", err.toString()); 
        // })
        .pipe(gulp.dest(config.distAssets + 'javascripts'));
});
gulp.task('bower-uglify', function(){
    return bowerJsFiles.pipe(gp_concat('bower-bundle.js'))
        .pipe(gulp.dest(config.dist))
        .pipe(gp_rename('bower-dependencies.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest(config.distAssets + 'javascripts'));
});
gulp.task('minify-css', function(){
    return cssFiles.pipe(gp_concat('css-bundle.css'))
        .pipe(gulp.dest(config.dist))
        .pipe(gp_rename('application-css.min.css'))
        .pipe(cleanCSS({ inline: ['none']}))
        .pipe(gulp.dest(config.distAssets + 'stylesheets'));
});
gulp.task('minify-bower-css', function(){
    return bowerCssFiles.pipe(gp_concat('bower-css-bundle.css'))
        .pipe(gulp.dest(config.dist))
        .pipe(gp_rename('bower-css.min.css'))
        .pipe(cleanCSS({ inline: ['none']}))
        .pipe(gulp.dest(config.distAssets + 'stylesheets'));
});