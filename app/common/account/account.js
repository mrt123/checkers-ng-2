angular
    .module('account', [])
    .service('account', ['parseAccountVendor', Account]);

function Account(accountProvider) {
    accountProvider.init();
    
    this.signUp = accountProvider.signUp;
    this.signIn = accountProvider.signIn;
    this.signOut = accountProvider.signOut;
    this.getUser = accountProvider.getUser;
    this.getUsername = accountProvider.getUsername;

    this.onSignUpSuccess = accountProvider.onSignUpSuccess;
    this.onSignInSuccess = accountProvider.onSignInSuccess;
}