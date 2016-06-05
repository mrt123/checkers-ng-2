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
        });
}