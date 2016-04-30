var gulp = require('gulp'),
        browserSync = require('browser-sync'),
        proxy = require('proxy-middleware'),
        url = require('url');

var devServer = browserSync.create("dev-server");

// assuming task is sequenced externally (no dependent tasks here).
gulp.task('serve', [], function () {

    var urlObj = url.parse('http://localhost:3005/api');
    urlObj.route = '/api';

    devServer.init({
        port: 3000,
        server: {
            baseDir: 'app',
            middleware: [proxy(urlObj)]
        },
        open: false
    });

    // notice: '**/*' or '/**/*' will watch entire drive
    gulp.watch(jsFiles, {}, ['modules', 'concat', devServer.reload]);  // TODO: pipe watch output to modules without getting src again!
    gulp.watch(['./**/*.html'], {}, devServer.reload);
    gulp.watch(cssFiles, ['less']);  // inject pre-processed css without page reload.
});