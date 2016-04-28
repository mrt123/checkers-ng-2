var gulp = require('gulp'),
    angularModules = require("gulp-angular-modules"),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    del = require('del'),
    eventStream = require('event-stream'),
    less = require('gulp-less'),
    csslint = require('gulp-csslint'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence'),
    sourceMaps = require('gulp-sourcemaps');

var buildPath = '../target/build';
var appJsFiles = ["../web/views/**/*.js", "../web/components/**/*.js"];  // TODO: add dev script


gulp.task('compile-clean', function (done) {
    var deletePath = buildPath + '/**/*';
    return del([deletePath], {force: true});
});

gulp.task('compile-app.js', function () {

    var appSubModules = gulp.src(appJsFiles)
        .pipe(angularModules("app-sub-modules.js", {name: "app-sub-modules"}));

    var jsStream = gulp.src(appJsFiles)
        .pipe(sourceMaps.init());

    var streams = [
        appSubModules,
        jsStream
    ];

    return eventStream.merge(streams)
        .pipe(concat('app.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(buildPath));
});

gulp.task('compile-app.css', function () {
    //var devServer = browserSync.get('devServer');

    return gulp.src('../web/css/**/*.less')
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(csslint())             // will report what less compile misses.
        .pipe(csslint.reporter())
        .pipe(concat('app.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(buildPath));
    //.pipe(devServer.stream());
});

gulp.task('compile', function (callback) {
    runSequence(
        'compile-clean',
        ['compile-app.js', 'compile-app.css'],
        callback
    );
});
