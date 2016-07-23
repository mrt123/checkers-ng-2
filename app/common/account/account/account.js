angular
    .module('account', ['parseAccountVendor', 'facebook'])
    .service('account', ['parseAccountVendor', 'facebook', '$q', Account]);

function Account(accountVendor, facebookVendor, $q) {
    var self = this;
    
    activate();

    this.signUp = accountVendor.signUp;
    this.signIn = accountVendor.signIn;
    this.signOut = signOut;
    this.getUser = accountVendor.getUser;
    this.getUsername = accountVendor.getUsername;

    this.user = accountVendor.user;

    function activate() {
        accountVendor.init();
        facebookVendor.libStatus.promise.then(undefined, undefined, onLibStatusChange);
        facebookVendor.user.promise.then(undefined, undefined, onFacebookUserChange);
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

    function onLibStatusChange(libStatus) {
        if (libStatus === 'loaded') {
            facebookVendor.tryGetUser();
        }
    }

    function onFacebookUserChange(facebookUser) {
        if(facebookUser) {
            accountVendor.signIn(facebookUser.email, facebookUser.id).then(
                undefined,
                createAccountForFacebookUser.bind(undefined, facebookUser));
        }
        else {
            self.user.notify();
        }
        

    }

    function createAccountForFacebookUser(facebookUser) {
        accountVendor.signUp(facebookUser.email, facebookUser.id, facebookUser.name);
    }
}