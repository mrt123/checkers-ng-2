angular
    .module('AbstractAccount', [])
    .factory('AbstractAccount', AbstractAccount);

function AbstractAccount() {

    var signUpSuccessCallbacks = [];
    var logInSuccessCallbacks = [];

    return {
        addOnSignUpCallback: addOnSignUpCallback,
        addOnLoginCallback: addOnLoginCallback,
        executeSignUpSuccessCallbacks: executeSignUpSuccessCallbacks,
        executeLoginSuccessCallbacks: executeLoginSuccessCallbacks
    };

    function addOnSignUpCallback(callback) {
        signUpSuccessCallbacks.push(callback);
    }

    function addOnLoginCallback(callback) {
        logInSuccessCallbacks.push(callback);
    }

    function executeSignUpSuccessCallbacks(args) {
        executeCallbacks(signUpSuccessCallbacks, args);
    }

    function executeLoginSuccessCallbacks(args) {
        executeCallbacks(logInSuccessCallbacks, args);
    }

    function executeCallbacks(callbacks, args) {
        angular.forEach(callbacks, function (callback) {
            callback.apply(undefined, args);
        });
    }
}