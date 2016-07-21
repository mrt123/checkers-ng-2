angular
    .module('account', ['parseAccountVendor', 'facebook'])
    .service('account', ['parseAccountVendor', 'facebook', '$q', Account]);

function Account(accountVendor, facebookVendor, $q) {
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

    function signOut() {
        var deferred = $q.defer();

        accountVendor.signOut().then(function () {

            if (facebookVendor.getLoginStatus === 'connected') {
                facebookVendor.logOut().then(deferred.resolve);
            }
            else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    function checkFacebookLoginStatus() {
        facebookVendor.getLoginStatus().then(function (status) {
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