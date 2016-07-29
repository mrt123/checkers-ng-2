var gulp = require('gulp'),
        browserSync = require('browser-sync'),
        proxy = require('proxy-middleware'),
        url = require('url');

var devServer = browserSync.create("dev-server");
var Project = require('./Project');
var project = new Project();

// assuming task is sequenced externally (no dependent tasks here).
gulp.task('serve', [], function () {

    var urlObj = url.parse('http://127.0.0.1:6004/_api');
    urlObj.route = '/_api';

    devServer.init({
        port: 3000,
        server: {
            baseDir: project.BUILD_PATH,
            middleware: [proxy(urlObj)]   // TODO: use routes: option instead
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                'font-size': '22px'
            }
        },
        open: false
    });

    // XXX: '**/*' or '/**/*' will watch entire drive
    // TODO: pipe watch output to modules without getting src again!
    gulp.watch(project.JS_FILES, {}, ['compile-app.js', devServer.reload]);
    gulp.watch([project.TEMPLATES], {},['compile-templates', devServer.reload]);
    gulp.watch([project.ASSETS], {},['compile-assets', devServer.reload] );
    gulp.watch(project.LESS_FILES, ['compile-app.css']);  // inject pre-processed css without page reload.
});