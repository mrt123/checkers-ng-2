module.exports = function (config) {
    var Project = require('./gulp-tasks/Project');
    var project = new Project();
    
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        

        // https://karma-runner.github.io/1.0/config/configuration-file.html
        files: []
            
            // INTEGRATION LIBS
            //.concat(project.BUILD_PATH + '/lib/parse.js')
            //.concat(project.BUILD_PATH + '/lib/jquery.js')
            //.concat(project.BUILD_PATH + '/lib/angular-ui-router.js')
            
            // LIBS
            .concat(project.BUILD_PATH + '/lib/angular.js')
            
            // SOURCES
            .concat(project.APP_PATH + '/**/!(*.spec).js')

            // TEST LIBS
            .concat('./node_modules/angular-mocks/angular-mocks.js')
            .concat('./bower_components/sinon-1.17.3/index.js')

            // TEST SRC
            .concat(project.APP_PATH + '/testApi.js')
            .concat('./bower_components/sinon-1.17.3/index.js')
            .concat(project.TEST_FILES),

            
        exclude: [],


        // pre-process matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // source files, that you wanna generate coverage for
            '../../app/**/!(*.spec).js' : ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'dots', 'coverage'],


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
