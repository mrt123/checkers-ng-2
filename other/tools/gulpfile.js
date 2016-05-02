var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    requireDir = require('require-dir');

requireDir('./gulp-tasks', { recurse: true } );

gulp.task('default', ['develop']);

gulp.task('develop', function (callback) {
    runSequence(
        [ 'compile' /*,'rest-server' */ ],
        'serve',
        callback
    );
});