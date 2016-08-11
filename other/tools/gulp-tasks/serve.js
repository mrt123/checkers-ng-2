var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxy = require('proxy-middleware');
var url = require('url');
var requireDir = require('require-dir');

requireDir('./', { recurse: true } );

var devServer = browserSync.create("dev-server");
var Project = require('./Project');
var project = new Project();

// assuming task is sequenced externally (no dependent tasks here).
gulp.task('serve', [], function () {

    var urlObj = url.parse('http://localhost:1337/parse');
    urlObj.route = '/api';

    devServer.init({
        port: 3000,
        ghostMode: false,
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
    gulp.watch([project.JS_FILES, project.DEV_FILES], {}, ['compile-app.js', devServer.reload]);
    gulp.watch([project.TEMPLATES], {},['compile-templates', devServer.reload]);
    gulp.watch([project.ASSETS], {},['compile-assets', devServer.reload] );
    gulp.watch(project.LESS_FILES, ['compile-app.css']);  // inject pre-processed css without page reload.
});