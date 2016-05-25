var module = angular.module('account_hoodie', []);
module.service('account_hoodie', Account);

function Account($q) {
    this.signUp = signUp;
    this.signIn = signIn;
    this.signOut = signOut;
    this.getUsername = getUsername;

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
}