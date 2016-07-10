var Project = function () {
    this.BUILD_PATH = '../../target';
    
    this.APP_PATH = '../../app';
    
    this.JS_SUB_MODULES = [
        this.APP_PATH + '/**/*.js',
        '!' + this.APP_PATH + '/**/*.spec.js'
    ];
    
    this.TEST_FILES = [
        this.APP_PATH + '/**/*.spec.js'
    ];
    
    this.JS_FILES = []
            .concat(this.JS_SUB_MODULES)
            .concat([this.APP_PATH + '/app.js']);
    
    this.DEV_FILES = ['_devAPI.js'];

    this.CSS_FILES = [this.APP_PATH + '/**/*.less'];
    
    this.TEMPLATES = [
        this.APP_PATH + '/**/*.html',
        this.APP_PATH + '/common*/**/*.html'
    ];

    this.BOWER_PATH = './bower_components';
    
    this.ASSETS = [
        this.APP_PATH + '/index.html',
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



