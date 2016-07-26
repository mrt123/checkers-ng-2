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
        facebookVendor.libStatus.promise.then(undefined, undefined, onLibStatusChange);
    }

    function login(u, p) {

        var loginPromise = accountVendor.signIn(u, p);
        loginPromise.then(setUser, unSetUser);
        return loginPromise;
    }

    function loginWithFB() {

        var loginPromise = facebookVendor.login();
        loginPromise.then(loginFacebookUserToVendor, unSetUser);
        return loginPromise;
    }

    function signUp(email, pass, playerName) {

        var signUpPromise = accountVendor.signUp(email, pass, playerName);
        signUpPromise.then(setUser);
        return signUpPromise;
    }

    function signOut() {

        return accountVendor.signOut()
            .then(facebookLogout)
            .then(unSetUser, unSetUser);
    }

    function facebookLogout() {

        if (self.facebookUser.email) {
            facebookVendor.logOut();
            self.facebookUser = {};
        }
    }

    function onLibStatusChange(libStatus) {

        if (libStatus === 'loaded') {
            facebookVendor.tryFetchUserData()
                .then(setFacebookUser)
                .finally(checkVendorUser);
        }
    }

    function checkVendorUser() {
        accountVendor.getUser().then(setUser, onVendorUserAbsent);
    }

    function onVendorUserAbsent() {

        if (self.facebookUser.email) {
            loginFacebookUserToVendor(self.facebookUser);
        }
        else {
            self.userChange.notify(); // TODO: rename to userEvent
        }
    }

    function loginFacebookUserToVendor(facebookUser) {
        accountVendor.signIn(facebookUser.email, facebookUser.id).then(
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