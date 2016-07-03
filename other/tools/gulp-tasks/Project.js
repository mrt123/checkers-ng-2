var Project = function () {
    this.BUILD_PATH = '../../target';
    
    var APP_PATH = '../../app';
    
    this.JS_SUB_MODULES = [
        APP_PATH + '/**/*.js',
        '!' + APP_PATH + '/**/*.spec.js'
    ];
    
    this.TEST_FILES = [
        APP_PATH + '/**/*.spec.js'
    ];
    
    this.JS_FILES = []
            .concat(this.JS_SUB_MODULES)
            .concat([APP_PATH + '/app.js']);
    
    this.DEV_FILES = ['_devAPI.js'];

    this.CSS_FILES = [APP_PATH + '/**/*.less'];
    
    this.TEMPLATES = [
        APP_PATH + '/**/*.html',
        APP_PATH + '/common*/**/*.html'
    ];

    this.BOWER_PATH = './bower_components';
    
    this.ASSETS = [
        APP_PATH + '/index.html',
        this.BOWER_PATH + '/font-awesome/fonts*/**',
        '../assets/**'
    ];
    
    this.VENDORS = [
        this.BOWER_PATH + '/parse/parse.js',
        this.BOWER_PATH + '/jquery/dist/jquery.js',
        this.BOWER_PATH + '/font-awesome/css/font-awesome.css',
        this.BOWER_PATH + '/angular/angular.js',
        this.BOWER_PATH + '/ui-router/release/angular-ui-router.js'
    ];
};
module.exports = Project;



