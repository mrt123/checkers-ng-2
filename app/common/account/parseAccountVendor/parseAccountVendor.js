angular.module('parseAccountVendor', [])
    .service('parseAccountVendor', parseAccountVendor);

function parseAccountVendor($q) {
    var self = {};
    self.init = init;
    self.signUp = signUp;
    self.signIn = signIn;
    self.signOut = signOut;
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
            Parse.User.logOut().then(function () {
                resolve();
            });
        });
    }

    function _generateUser(vendorUser) {
        return {
            email: vendorUser.getUsername(),
            playerName: vendorUser.get('playerName')
        }
    }
}
