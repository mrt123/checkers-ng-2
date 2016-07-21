angular
    .module('account', ['parseAccountVendor', 'facebook'])
    .service('account', ['parseAccountVendor', 'facebook', Account]);

function Account(accountVendor, facebookVendor) {
    accountVendor.init();
    activate();

    this.signUp = accountVendor.signUp;
    this.signIn = accountVendor.signIn;
    this.signOut = signOut;
    this.getUser = accountVendor.getUser;
    this.getUsername = accountVendor.getUsername;

    this.deferredRegister = accountVendor.deferredRegister;
    this.deferredLogin = accountVendor.deferredLogin;

    function activate() {
        facebookVendor.deferredLibLoad.promise.then(undefined, undefined, checkFacebookLoginStatus);
        facebookVendor.deferredLogin.promise.then(undefined, undefined, checkFacebookLoginStatus);
    }

    function signOut(callback) { 
        accountVendor.signOut(function () {
            facebookVendor.logOut(callback);
        });
    }

    function checkFacebookLoginStatus() {
        facebookVendor.getLoginStatus(function (status) {
            if (status === 'connected') {
                reactToFacebookConnected();
            }
        });
    }

    function reactToFacebookConnected() {
        facebookVendor.getUser().then(signFacebookUserIntoAccount);
    }

    function signFacebookUserIntoAccount(facebookUser) {  
        accountVendor.signIn(facebookUser.email, facebookUser.id).then(
            accountVendor.deferredLogin.notify,
            createAccountForFacebookUser.bind(undefined, facebookUser));
    }

    function createAccountForFacebookUser(facebookUser) {
        accountVendor.signUp(facebookUser.email, facebookUser.id, facebookUser.name);
    }
}