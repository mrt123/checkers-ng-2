var gulp = require('gulp');
var gulp_express = require('gulp-express');

var Project = require('./Project');
var project = new Project();

gulp.task('parseServer', function () {
    gulp_express.run([project.BACKEND_PATH + '/parseServer.js'], {}, false);
    gulp.watch([project.BACKEND_PATH + '/**/*.js'], [gulp_express.run]);
});