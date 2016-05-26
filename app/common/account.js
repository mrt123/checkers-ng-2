var module = angular.module('account', []);
module.service('account', ['account_parse', Account]);

function Account(accountProvider) {
    this.signUp = accountProvider.signUp;
    this.signIn = accountProvider.signIn;
    this.signOut = accountProvider.signOut;
    this.getUsername = accountProvider.getUsername;
}