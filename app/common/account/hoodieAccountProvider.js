var module = angular.module('hoodieAccountProvider', []);
module.service('hoodieAccountProvider', function ($q) {
    var hoodie;
    
    this.init = init;
    this.signUp = signUp;
    this.signIn = signIn;
    this.signOut = signOut;
    this.getUsername = getUsername;
    
    function init() {
        hoodie  = new Hoodie();
    }

    function signUp(username, password, signUpSuccess, signUpFail) {
        return hoodie.account.signUp(username, password)
            .done(signUpSuccess)
            .fail(signUpFail);
    }

    function signIn(username, password, signUpSuccess, signUpFail) {
        return hoodie.account.signIn(username, password)
            .done(signUpSuccess)
            .fail(signUpFail);
    }

    function signOut(signOutSuccess, SignOutFail) {
        return hoodie.account.signOut()
            .done(signOutSuccess)
            .fail(SignOutFail);
    }

    function getUsername() {
        return hoodie.account.username;
    }
});