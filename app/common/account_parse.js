var module = angular.module('account_parse', []);
module.service('account_parse', function($q) {
    this.signUp = signUp;
    this.signIn = signIn;
    this.signOut = signOut;
    this.getUsername = getUsername;

    function signUp(username, password, signUpSuccess, signUpFail) {
        return Parse.User.signUp(username, password, null, {
            success: signUpSuccess,
            error: function(user, error) {

                Object.prototype.getName = function() {
                    var funcNameRegex = /function (.{1,})\(/;
                    var results = (funcNameRegex).exec((this).constructor.toString());
                    return (results && results.length > 1) ? results[1] : "";
                };
                console.log(error.message);
                console.log(error);
                console.log(error.getName());



                signUpFail(error);
            }
        });
    }

    function signIn(username, password, signUpSuccess, signUpFail) {
        return Parse.User.logIn(username, password, {
            success: signUpSuccess.bind(undefined, username),
            error: signUpFail
        });
    }

    function signOut(signOutSuccess, SignOutFail) {
        return Parse.User.logOut();
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
