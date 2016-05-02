var Project = function (opt) {
    this.BUILD_PATH = '../../target';
    var APP_PATH = '../../app';
    this.JS_SUB_MODULES = [
        APP_PATH + '/views/**/*.js',
        APP_PATH + '/components/**/*.js'
    ];
    this.JS_FILES = this.JS_SUB_MODULES.concat([APP_PATH + '/app.js']);
    this.CSS_FILES = [APP_PATH + '/**/*.less'];
    this.TEMPLATES = [
        APP_PATH + '/**/*.html',
        APP_PATH + '/common*/**/*.html'
    ];

    var BOWER_PATH = './bower_components';
    this.ASSETS = [
        APP_PATH + '/index.html',
        BOWER_PATH + '/bootstrap/fonts*/**',
        '../assets/**'
    ];
    this.VENDORS = [
        BOWER_PATH + '/jquery/dist/jquery.js',
        BOWER_PATH + '/bootstrap/dist/js/bootstrap.js',
        BOWER_PATH + '/bootstrap/dist/css/bootstrap.css',
        BOWER_PATH + '/font-awesome/css/font-awesome.css',
        BOWER_PATH + '/angular/angular.js',
        BOWER_PATH + '/angular-route/angular-route.js',
        BOWER_PATH + '/ui-router/release/angular-ui-router.js',
        BOWER_PATH + '/angular-route/angular-route.js'
    ];
};
module.exports = Project;



