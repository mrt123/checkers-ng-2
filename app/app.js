var app = angular.module('app', [
    'templates',
    'app-sub-modules'
]);

app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('domain', {
                url: '^',
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: 'sign-up/sign-up.html',
                controller: 'SignUpCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl'
            })
            .state('user.game', {
                url: '/game',
                views: {
                    'game': {
                        templateUrl: 'game/game.html',
                        controller: 'GameCtrl'
                    }
                }
            })
            .state('user.game.board', {  // not materialised in url
                views: {
                    'board': {
                        templateUrl: 'board/board.html',
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