angular
    .module('parseAccountVendor', [])
    .service('parseAccountVendor', parseAccountVendor);

function parseAccountVendor(AbstractAccount) {
    var self = this;

    this.init = init;
    this.signUp = signUp;
    this.signIn = signIn;
    this.signOut = signOut;
    this.getUsername = getUsername;

    this.onSignUpSuccess = onSignUpSuccess;
    this.signUpSuccessCallbacks = [];

    this.onSignInSuccess = onSignInSuccess;
    this.signInSuccessCallbacks = [];


    function init() {
        Parse.initialize("CHECKERS_2");
        Parse.serverURL = 'http://localhost:1337/parse';
    }

    function signUp(username, password, success, signUpFail) {
        return Parse.User.signUp(username, password, null, {
            success: function (user) {
                if (angular.isFunction(success)) {
                    success(user.getUsername());
                }
                executeCallbacks(self.signUpSuccessCallbacks, [user.getUsername()]);

                //executeSignUpSuccessCallbacks(user.getUsername());
            },
            error: function (user, error) {
                if (angular.isFunction(signUpFail)) {
                    signUpFail(error);
                }
            }
        });
    }

    function signIn(username, password, success, fail) {
        return Parse.User.logIn(username, password, {
            success: function (user) {
                if (angular.isFunction(success)) {
                    success(user.getUsername());
                }
                executeCallbacks(self.signInSuccessCallbacks, [user.getUsername()]);
            },
            error: function (user, error) {
                fail(error);
            }
        });
    }

    function signOut(signOutSuccess, SignOutFail) {
        return Parse.User.logOut()
            .then(signOutSuccess, SignOutFail);
    }

    function getUsername() {
        var currentUser = Parse.User.current();

        if (currentUser !== null) {
            return currentUser.getUsername();
        }
        else {
            return '';
        }
    }

    function onSignUpSuccess(callback) {
        self.signUpSuccessCallbacks.push(callback);
    }

    function onSignInSuccess(callback) {
        self.signInSuccessCallbacks.push(callback);
    }

    function executeCallbacks(callbacks, args) {
        angular.forEach(callbacks, function (callback) {
            callback.apply(undefined, args);
        })
    }
}
