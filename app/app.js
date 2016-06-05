angular
    .module('app', [ 'templates', 'app-sub-modules'])
    .config(config)
    .run(run);

function config() {

}

function run($rootScope) {

    $rootScope.toggleDebug = function () {
        if (_dev.debug) {
            $rootScope.$broadcast('debug', false);
            _dev.debug = false;
        }
        else {
            $rootScope.$broadcast('debug', true);
            _dev.debug = true;
        }
    };
}