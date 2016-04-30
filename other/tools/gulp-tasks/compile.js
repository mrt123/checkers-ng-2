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
    sourceMaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');

var Project = require('./Project');
var project = new Project();

var BUILD_PATH = project.BUILD_PATH;
var APP_JS_SUB_MODULES = project.APP_JS_SUB_MODULES;
var APP_JS_FILES = project.APP_JS_FILES;  // TODO: add dev script
var TEMPLATES = project.TEMPLATES_REFERENCES;
var ASSETS = project.ASSETS_REFERENCES;

var BOWER_PATH = '../../target/bower_components';
var VENDORS = [
    BOWER_PATH + '/jquery/dist/jquery.js',
    BOWER_PATH + '/bootstrap/dist/js/bootstrap.js',
    BOWER_PATH + '/bootstrap/dist/css/bootstrap.css',
    BOWER_PATH + '/font-awesome/css/font-awesome.css',
    BOWER_PATH + '/angular/angular.js',
    BOWER_PATH + '/angular-route/angular-route.js',
    BOWER_PATH + '/ui-router/release/angular-ui-router.js',
    BOWER_PATH + '/angular-route/angular-route.js'
];


gulp.task('compile-clean', function () {
    var deletePath = BUILD_PATH + '/**/*';
    return del([deletePath], {force: true});
});

gulp.task('compile-app.js', function () {

    var appSubModules = gulp.src(APP_JS_SUB_MODULES)
        .pipe(angularModules("app-sub-modules.js", {name: "app-sub-modules"}));

    var jsStream = gulp.src(APP_JS_FILES)
        .pipe(sourceMaps.init());

    var streams = [
        appSubModules,
        jsStream
    ];

    return eventStream.merge(streams)
        .pipe(concat('app.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('compile-app.css', function () {
    //var devServer = browserSync.get('devServer');

    return gulp.src('../../app/**/*.less')
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(csslint())             // will report what less compile misses.
        .pipe(csslint.reporter())
        .pipe(concat('app.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(BUILD_PATH));
    //.pipe(devServer.stream());
});


gulp.task('compile-templates', function () {
    return gulp.src(TEMPLATES)
        .pipe(templateCache({
            module: 'templates',
            standalone: true
        }))
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('compile-assets', function () {
    return gulp.src(ASSETS)
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('compile-vendors', function () {
    return gulp.src(VENDORS)
        .pipe(gulp.dest(BUILD_PATH + '/lib'));
});

gulp.task('compile', function (callback) {
    runSequence(
        'compile-clean',
        [
            'compile-app.js',
            'compile-app.css',
            'compile-assets',
            'compile-vendors',
            'compile-templates'
        ],
        callback
    );
});
