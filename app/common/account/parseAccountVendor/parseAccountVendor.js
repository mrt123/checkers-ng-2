angular.module('parseAccountVendor', [])
    .service('parseAccountVendor', parseAccountVendor);

function parseAccountVendor($q) {
    var self = {};
    self.init = init;
    self.signUp = signUp;
    self.signIn = signIn;
    self.signOut = signOut;
    self.getUser = getUser;
    return self;

    function init() {
        Parse.initialize("CHECKERS_2");
        Parse.serverURL = 'http://localhost:1337/parse';
    }

    function signUp(username, password, playerName) {
        
        return $q(function (resolve, reject) {
            Parse.User.signUp(username, password, {playerName: playerName})
                .then(function (vendorUser) {
                    var user = _generateUser(vendorUser);
                    resolve(user);
                },
                reject
            );
        });
    }

    function signIn(username, password) {
        // TODO: handle bug when parse will not resolve/reject promise, when u/p are undefined.
        return $q(function (resolve, reject) {
            Parse.User.logIn(username, password, {
                success: function (vendorUser) {
                    var user = _generateUser(vendorUser);
                    resolve(user);
                },
                error: function (vendorUser, error) {
                    reject(error);
                }
            });
        });
    }

    function signOut() {
        return $q(function (resolve, reject) { 
            Parse.User.logOut().then(resolve, resolve);
        });
    }

    function getUser() {
        var user = Parse.User.current();
        if(user !== null) {
            return _generateUser(user);
        }
        else {
            return undefined;
        }
        
    }

    function _generateUser(vendorUser) {
        return {
            email: vendorUser.getUsername(),
            playerName: vendorUser.get('playerName')
        }
    }
}
