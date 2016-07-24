angular
    .module('parseAccountVendor', [])
    .service('parseAccountVendor', parseAccountVendor);

function parseAccountVendor($q) {
    var self = {};

    self.init = init;
    self.signUp = signUp;
    self.signIn = signIn;
    self.signOut = signOut;

    self.user = $q.defer();

    return self;

    function init() {
        Parse.initialize("CHECKERS_2");
        Parse.serverURL = 'http://localhost:1337/parse';
    }

    function signUp(username, password, playerName) {
        return $q(function (resolve, reject) {
            Parse.User.signUp(username, password, {playerName: playerName})
                .then(function (vendorUser) {
                    var user = generateUser(vendorUser);
                    resolve(user);
                    self.user.notify(user);
                },
                reject
            );
        });
    }

    function signIn(username, password) {
        return $q(function (resolve, reject) {
            Parse.User.logIn(username, password)
                .then(function (vendorUser) {
                    var user = generateUser(vendorUser);
                    resolve(user);
                    self.user.notify(user);
                },
                reject
            );
        });
    }

    function signOut() {
        return $q(function (resolve, reject) {
            Parse.User.logOut().then(function () {
                resolve();
                self.user.notify();
            });
        });
    }

    function generateUser(vendorUser) {
        return {
            email: vendorUser.getUsername(),
            playerName: vendorUser.get('playerName')
        }
    }
}
