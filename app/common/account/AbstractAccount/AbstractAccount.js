angular
    .module('AbstractAccount', [])
    .factory('AbstractAccount', AbstractAccount);

function AbstractAccount() {

    function Constructor(name) {
        this.name = name;
        this.signUpSuccessCallbacks = []; // TODO: replace with registerCallbacks : { success: [], failure: [] }, to improve verbosity of API
        this.logInSuccessCallbacks = [];
    }

    Constructor.prototype.addOnSignUpCallback = function(callback) {
        this.signUpSuccessCallbacks.push(callback);
    };

    Constructor.prototype.addOnLoginCallback = function(callback) {
        this.logInSuccessCallbacks.push(callback);
    };

    Constructor.prototype.executeSignUpSuccessCallbacks = function(args) {
        this.executeCallbacks(this.signUpSuccessCallbacks, args);
    };

    Constructor.prototype.executeLoginSuccessCallbacks = function(args) {
        this.executeCallbacks(this.logInSuccessCallbacks, args);
    };

    Constructor.prototype.executeCallbacks = function(callbacks, args) {  
        angular.forEach(callbacks, function (callback) {
            callback.apply(undefined, args);
        });
    };

    return Constructor;
}