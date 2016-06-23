angular
    .module('parseAccountVendor', [])
    .service('parseAccountVendor', parseAccountVendor);

function parseAccountVendor($q, AbstractAccount) {
    var self = Object.create(AbstractAccount);

    self.init = init;
    self.signUp = signUp;
    self.signIn = signIn;
    self.signOut = signOut;
    self.getUser = getUser;
    self.getUsername = getUsername;

    self.onSignUpSuccess = self.addOnSignUpCallback;
    self.onSignInSuccess = self.addOnLoginCallback;
    
    return self;

    function init() {
        Parse.initialize("CHECKERS_2");
        Parse.serverURL = 'http://localhost:1337/parse';
    }

    function signUp(username, password, playerName, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success;
        var fail = callbacks.fail;
        
        return Parse.User.signUp(username, password, { playerName: playerName}, {
            success: function (vendorUser) {
                var user = generateUser(vendorUser);
                
                if (success) {
                    success(user);
                }
                self.executeSignUpSuccessCallbacks([user]);
            },
            error: function (vendorUser, error) {
                if (fail) {
                    fail(generateUser(vendorUser), error);
                }
            }
        });
    }

    function signIn(username, password, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success;
        var fail = callbacks.fail;
        
        return Parse.User.logIn(username, password, {
            success: function (vendorUser) {
                var user = generateUser(vendorUser);
                
                if (angular.isFunction(success)) {
                    success(user);
                }
                self.executeLoginSuccessCallbacks([user]);
            },
            error: function (vendorUser, error) {
                fail(generateUser(vendorUser), error);
            }
        });
    }

    function signOut(signOutSuccess, SignOutFail) {
        return Parse.User.logOut()
            .then(signOutSuccess, SignOutFail);
    }
    
    function getUser() {
        return generateUser(Parse.User.current());
    }

    function getUsername() {
        var currentUser = Parse.User.current()();

        if (currentUser !== null) {
            return currentUser.getUsername();
        }
        else {
            return '';
        }
    }

    function generateUser(vendorUser) {
        return {
            email: vendorUser.getUsername(),
            playerName: vendorUser.get('playerName')
        }
    }
}
