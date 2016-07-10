module.exports = function (config) {
    var Project = require('./gulp-tasks/Project');
    var project = new Project();
    console.log(project.LIB_BUILD_PATH + '/*.js');
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        files: []
            .concat(project.BUILD_PATH + '/lib/parse.js')
            .concat(project.BUILD_PATH + '/lib/jquery.js')
            .concat(project.BUILD_PATH + '/lib/angular.js')
            .concat('./node_modules/angular-mocks/angular-mocks.js')
            .concat(project.BUILD_PATH + '/lib/angular-ui-router.js')
            .concat(project.BUILD_PATH + '/templates.js')
            .concat(project.BUILD_PATH + '/app.js')
            .concat(project.APP_PATH + '/testApi.js')
            .concat('./bower_components/sinon-1.17.3/index.js')
            .concat(project.TEST_FILES),
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
