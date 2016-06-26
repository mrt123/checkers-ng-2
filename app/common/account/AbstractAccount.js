angular
    .module('AbstractAccount', [])
    .factory('AbstractAccount', AbstractAccount);

function AbstractAccount() {
    
    return function() {
        
        function Constructor(name) {
            this.name = name;
            this.signUpSuccessCallbacks = [];
            this.logInSuccessCallbacks = [];
            this.addOnSignUpCallback = addOnSignUpCallback;
            this.addOnLoginCallback = addOnLoginCallback;
            this.executeSignUpSuccessCallbacks = executeSignUpSuccessCallbacks;
            this.executeLoginSuccessCallbacks = executeLoginSuccessCallbacks;
        }
        return Constructor;
    }();

    function addOnSignUpCallback(callback) {
        this.signUpSuccessCallbacks.push(callback);
    }
    
    function addOnLoginCallback(callback) {
        this.logInSuccessCallbacks.push(callback);
    }

    function executeSignUpSuccessCallbacks(args) {
        executeCallbacks(this.signUpSuccessCallbacks, args);
    }

    function executeLoginSuccessCallbacks(args) {
        executeCallbacks(this.logInSuccessCallbacks, args);
    }

    function executeCallbacks(callbacks, args) {
        angular.forEach(callbacks, function (callback) {
            callback.apply(undefined, args);
        });
    }
}