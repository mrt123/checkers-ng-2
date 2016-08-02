angular
    .module('account', ['parseAccountVendor', 'facebook'])
    .service('account', ['parseAccountVendor', 'facebook', '$q', Account]);

function Account(accountVendor, facebookVendor, $q) {
    var self = this;

    self.signUp = signUp;
    self.login = login;
    self.loginWithFB = loginWithFB;
    self.signOut = signOut;
    self.userChange = $q.defer();
    self.user = undefined;
    self.facebookUser = {};

    activate();

    function activate() {
        accountVendor.init();
        self.user = accountVendor.getUser();
        facebookVendor.libStatus.promise.then(undefined, undefined, onLibStatusChange);
    }

    function login(u, p) {

        var loginPromise = accountVendor.signIn(u, p);
        loginPromise.then(setUser);
        return loginPromise;
    }

    function loginWithFB() {

        return facebookVendor.login().then(
            function (facebookUser) {
                setFacebookUser(facebookUser);
                return loginFacebookUserToVendor(facebookUser)
            },
            unSetUser
        );
    }

    function signUp(email, pass, playerName) {

        var signUpPromise = accountVendor.signUp(email, pass, playerName);
        signUpPromise.then(setUser);
        return signUpPromise;
    }

    function signOut() {
        return $q(function (resolve, reject) {
            accountVendor.signOut()
                .then(_facebookLogout)
                .finally(function () {
                    unSetUser();
                    resolve();
                });
        });
    }

    function _facebookLogout() {
        return $q(function (resolve, reject) {
            if (self.facebookUser.email) {
                self.facebookUser = {};
                facebookVendor.logOut().then(resolve);
            }
            else {
                resolve();
            }
        })
    }

    function onLibStatusChange(libStatus) {
        if (libStatus === 'loaded') {
            self.userChange.notify();
        }
    }
    
    function loginFacebookUserToVendor(facebookUser) {
        return accountVendor.signIn(facebookUser.email, facebookUser.id).then(
            setUser,
            createVendorAccountForFacebookUser.bind(undefined, facebookUser));

    }

    function createVendorAccountForFacebookUser(facebookUser) {
        accountVendor.signUp(facebookUser.email, facebookUser.id, facebookUser.name)
            .then(setUser);
    }

    function setFacebookUser(user) {
        self.facebookUser = user
    }

    function setUser(user) {
        self.user = user;
        self.userChange.notify();
    }

    function unSetUser() {
        self.user = undefined;
        self.userChange.notify();
    }
}