angular
    .module('account', ['parseAccountVendor', 'facebook'])
    .service('account', ['parseAccountVendor', 'facebook', '$q', Account]);

function Account(accountVendor, facebookVendor, $q) {
    var self = this;

    self.signUp = signUp;
    self.login = login;
    self.loginWithFB  = loginWithFB;
    self.signOut = signOut;
    self.userChange = $q.defer();
    self.user = {};

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
        loginPromise.then(onFacebookUserChange, unSetUser);
        return loginPromise;
    }
    
    function signUp(email, pass, playerName) {
        var signUpPromise = accountVendor.signUp(email, pass, playerName);
        signUpPromise.then(setUser);
        return signUpPromise;
    }

    function signOut() {
        return accountVendor.signOut()
            .then(facebookVendor.logOut)
            .then(unSetUser);
    }

    function onLibStatusChange(libStatus) {
        if (libStatus === 'loaded') {
            facebookVendor.tryFetchUserData().then(onFacebookUserChange, onFacebookUserChange);
        }
    }

    function onFacebookUserChange(facebookUser) {
        if (facebookUser) {
            accountVendor.signIn(facebookUser.email, facebookUser.id).then(
                setUser,
                createAccountForFacebookUser.bind(undefined, facebookUser));
        }
        else {
            unSetUser();
        }
    }

    function createAccountForFacebookUser(facebookUser) {
        accountVendor.signUp(facebookUser.email, facebookUser.id, facebookUser.name)
            .then(setUser);
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