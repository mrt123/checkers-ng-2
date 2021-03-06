angular
    .module('app')
    .config(config);

function config($stateProvider) {
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
        .state('account-overview', {
            url: '/account-overview',
            templateUrl: 'account_overview/account_overview.html',
            controller: 'AccountOverViewCtrl'
        })
        .state('myGames', {
            url: '/myGames',
            templateUrl: 'myGames/myGames.html',
            controller: 'MyGamesCtrl'
        })
        .state('createGame', {
            url: '/createGame',
            templateUrl: 'createGame/createGame.html',
            controller: 'CreateGameCtrl'
        })
        .state('game', {
            url: '/game/:id',
            templateUrl: 'game/game.html',
            controller: 'GameCtrl'
        });
}