var module = angular.module('account_parse', []);
module.service('account_parse', function($q) {
    this.signUp = signUp;
    this.signIn = signIn;
    this.signOut = signOut;
    this.getUsername = getUsername;

    function signUp(username, password, success, signUpFail) {
        return Parse.User.signUp(username, password, null, {
            success: function(user){
                success(user.getUsername());
            },
            error: function(user, error) {
                signUpFail(error);
            }
        });
    }

    function signIn(username, password, success, fail) {
        return Parse.User.logIn(username, password, {
            success: function(user){
                success(user.getUsername());
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

        if(currentUser !== null) {
            return currentUser.getUsername();
        }
        else {
            return '';
        }
    }
});
