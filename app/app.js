var app = angular.module('app', [
    'templates',
    'gulp-angular-modules',
    'ui.router'
]);

app.config([
    '$stateProvider',
    '$routeProvider',
    function ($stateProvider, $routeProvider) {

        $stateProvider
            .state('user', {  // not materialised in url
                templateUrl: 'views/user/user.html',
                controller: 'UserCtrl'
            })
            .state('index', {
                url: '',
                templateUrl: 'views/index/index.html',
                controller: 'IndexCtrl'
            })
            .state('user.game', {
                url: '/game',
                views: {
                    'game': {
                        templateUrl: 'views/game/game.html',
                        controller: 'GameCtrl'
                    }
                }
            })
            .state('user.game.board', {  // not materialised in url
                views: {
                    'board': {
                        templateUrl: 'views/board/board.html',
                        controller: 'BoardCtrl'
                    }
                }
            });


    }]);

app.run([
    '$rootScope',
    function ($rootScope) {

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
]);