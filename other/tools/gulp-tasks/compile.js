// DO NOT USE PLUGIN LOADERS  (5x slower).
var gulp = require('gulp'),
    angularModules = require("gulp-angular-modules"),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    del = require('del'),
    less = require('gulp-less'),
    cssLint = require('gulp-csslint'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence'),
    sourceMaps = require('gulp-sourcemaps'),
    streamqueue = require('streamqueue'),
    templateCache = require('gulp-angular-templatecache');

var Project = require('./Project');
var project = new Project();

var BUILD_PATH = project.BUILD_PATH;

gulp.task('compile-clean', function () {
    var deletePath = BUILD_PATH + '/**/*';
    return del([deletePath], {force: true});
});

gulp.task('compile-app.js', function () {

    var subModulesStream = gulp.src(project.JS_SUB_MODULES)
        .pipe(angularModules(
            "app-sub-modules.js",
            {
                name: "app-sub-modules",
                modules: ['ui.router']
            }));

    var jsStream = gulp.src(project.JS_FILES)
        .pipe(sourceMaps.init());

    var queue = streamqueue(
        { objectMode: true },
        jsStream,
        subModulesStream
    );

    return queue
        .pipe(concat('app.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('compile-app.css', function () {
    var devServer = browserSync.get('dev-server');

    return gulp.src(project.CSS_FILES)
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(cssLint({    // will report what less compile misses.
                "qualified-headings": false,
                "ids": false,
                "bulletproof-font-face": false,
                "box-sizing": false,
                "duplicate-properties": false,
                "box-model": false   // I don't need warnings for padding vs width/height
            }))
        .pipe(cssLint.reporter())
        .pipe(concat('app.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(BUILD_PATH))
        .pipe(devServer.stream());
});


gulp.task('compile-templates', function () {
    return gulp.src(project.TEMPLATES)
        .pipe(templateCache({
            module: 'templates',
            standalone: true
        }))
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('compile-assets', function () {
    return gulp.src(project.ASSETS)
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('compile-vendors', function () {
    return gulp.src(project.VENDORS)
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
