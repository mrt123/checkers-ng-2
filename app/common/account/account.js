var module = angular.module('account', []);
module.service('account', ['parseAccountProvider', Account]);

function Account(accountProvider) {
    accountProvider.init();
    
    this.signUp = accountProvider.signUp;
    this.signIn = accountProvider.signIn;
    this.signOut = accountProvider.signOut;
    this.getUsername = accountProvider.getUsername;

    this.onSignUpSuccess = accountProvider.onSignUpSuccess;
    this.onSignInSuccess = accountProvider.onSignInSuccess;
}