var Project = function (opt) {
    this.BUILD_PATH = '../../target';
    var APP_PATH = '../../app';
    this.APP_JS_SUB_MODULES = [
        APP_PATH + '/views/**/*.js',
        APP_PATH + '/components/**/*.js'
    ];
    this.APP_JS_FILES = this.APP_JS_SUB_MODULES.concat(['/app.js']);
    this.TEMPLATES_REFERENCES = [
        APP_PATH + '/**/*.html',
        APP_PATH + '/common*/**/*.html',
        '!' + APP_PATH + '/**/index.html'
    ];
    this.ASSETS_REFERENCES = [APP_PATH + '/index/index.html', '../assets/**'];
};


Project.prototype = {
};
module.exports = Project;



