var module = angular.module('AbstractAccount', []);
module.factory('apiToken', ['AbstractAccount', function apiTokenFactory(clientId) {
    
    var AbstractFactory = function () {
        this.signUpSuccessCallbacks = [];
        this.logInSuccessCallbacks = [];
    };

    AbstractFactory.prototype.addOnSignUpCallback = function (callback) {
        this.signUpSuccessCallbacks.push(callback);
    };

    AbstractFactory.prototype.addOnLoginCallback = function (callback) {
        this.logInSuccessCallbacks.push(callback);
    };
    
    AbstractFactory.prototype.executeCallbacks = function (callbacks, args) {
        angular.forEach(callbacks, function(callback) {
            callback.apply(undefined, args);
        });
    };
    
    return AbstractFactory;
}]);