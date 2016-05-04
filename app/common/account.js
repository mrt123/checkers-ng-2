var module = angular.module('account', []);
module.service('account', Account);

function Account($q) {
    this.signUp = signUp;
    this.signIn = signIn;
    this.signOut = signOut;

    function signUp(username, password) {
        hoodie.account.signUp(username, password)
            .done(signUpSuccess)
            .fail(signUpFail);
    }

    function signIn(username, password) {
        hoodie.account.signIn(username, password)
            .done(signInSuccess)
            .fail(signIntFail);
    }

    function signOut() {
        hoodie.account.signOut()
            .done(signOutSuccess)
            .fail(SignOutFail);
    }

    // PRIVATE:

    function signUpSuccess() {
        console.log('sign up success')
    }

    function signUpFail(error) {
        console.log('sign up fail' + error)
    }

    function signInSuccess() {
        console.log('sign-in success')
    }

    function signIntFail(error) {
        console.log('sign-in fail' + error)
    }

    function signOutSuccess() {
        console.log('sign-out success')
    }

    function SignOutFail(error) {
        console.log('sign-out fail' + error)
    }
}