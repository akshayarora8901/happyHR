var gulp = require('gulp'),
  exec = require('child_process').exec,
  runSequence = require('run-sequence'),
  chalk = require('chalk');

require('require-dir')('build/tasks');

gulp.task('default', ['watch', 'dev-inject'], function() {
  exec("whoami", function(error, result) {
    console.log(chalk.bgGreen('Welcome to') + chalk.bold.bgGreen(' **HappyHR(Dev Mode)**'));
  });
});


gulp.task('build', function() {
    runSequence(['js-uglify', 'bower-uglify', 'minify-css', 'minify-bower-css', 'copy-index', 'copy-fonts', 'copy-images', 'copy-libs', 'copy-templates'], 'prod-inject', function() {
        exec("whoami", function(error, result) { 
            gulp.run('remove-bundles');
            console.log(chalk.bgGreen('Copy of ') + chalk.bold.bgGreen(' **COSMOS(Prod Mode)** - Frontend in dist folder') + chalk.bgGreen(' created! '));
        });
    });
});