angular
    .module('facebook', [])
    .service('facebook', facebook);

function facebook($interval, $q, $window) {
    var self = {};
    self.MAX_LIB_LOAD_TIME_MS = 5000;
    var LIB_LOAD_CHECK_INTERVAL_MS = 100;
    var STATUS = {
        LOADING: 'loading',
        LOADED: 'loaded',
        FAILED: 'failed'
    };

    self.login = login;
    self.logOut = logOut;
    self.tryFetchUserData = tryFetchUserData;

    self.libStatus = $q.defer();
    self.authToken = $q.defer();
    self.user = $q.defer();

    activate();

    return self;

    function activate() {
        self.libStatus.notify(STATUS.LOADING);
        checkLibStatus();
    }

    function checkLibStatus() {
        var elapsedTime = 0;

        var update = $interval(function () {
            elapsedTime = elapsedTime + LIB_LOAD_CHECK_INTERVAL_MS;

            var status = getLibLoadStatus($window.FacebookLoaded, elapsedTime);
            self.libStatus.notify(status);

            if ($window.FacebookLoaded) {
                $interval.cancel(update);
            }
        }, LIB_LOAD_CHECK_INTERVAL_MS, getLibCheckCount());
    }

    function login() {
        return _loginFlow().then(_fetchUserData);
    }

    function _loginFlow() {
        return $q(function (resolve, reject) {
            FB.login(function (token) {
                resolve(token);
                self.authToken.notify(token);
            }, {scope: 'public_profile,email'});
        });
    }

    function logOut() {
        $q(function (resolve, reject) {
            try {
                FB.logout(function (response) {
                    resolve(response);
                    self.user.notify();
                    self.authToken.notify(response);
                });
            }
            catch (e) {
                reject();
            }
        });
    }

    function tryFetchUserData() {

        return $q(function (resolve, reject) {
            _getAuthToken().then(function (token) {
                if (token.status === 'connected') {
                    resolve(_fetchUserData());
                }
                else {
                    reject();
                }
            });
        });



    }

    function _fetchUserData() {
        return $q(function (resolve, reject) {
            FB.api('/me', {fields: ['email', 'name']}, function (response) {
                resolve(response);
            });
        });
    }

    function _getAuthToken() {
        return $q(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                resolve(response);
                self.authToken.notify(response);
            }, true);
        });
    }

    function getLibCheckCount() {
        return parseInt(self.MAX_LIB_LOAD_TIME_MS / LIB_LOAD_CHECK_INTERVAL_MS)
    }

    function getLibLoadStatus(loaded, elapsedTime) {

        if (loaded) {
            return STATUS.LOADED;
        }
        else {
            if (elapsedTime < self.MAX_LIB_LOAD_TIME_MS) {
                return STATUS.LOADING;
            }
            else {
                return STATUS.FAILED;
            }
        }
    }
}
