angular
    .module('facebook', [])
    .service('facebook', facebook);

function facebook($interval, $q, $window) {
    var self = {};
    var MAX_LIB_LOAD_TIME_MS = 5000;
    var LIB_LOAD_CHECK_INTERVAL_MS = 100;
    var STATUS = {
        LOADING: 'loading',
        LOADED: 'loaded',
        FAILED: 'failed'
    };

    self.login = login;
    self.logOut = logOut;
    self.tryGetUser = tryGetUser;
    self.getAuthToken = getAuthToken;

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
        return $q(function (resolve, reject) {
            FB.login(function (response) {
                resolve(response);
                self.authToken.notify(response);
                getUser();
            }, {scope: 'public_profile,email'});
        });
    }

    function logOut() {
        return $q(function (resolve, reject) {
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

    function tryGetUser() {
        getAuthToken().then(function (token) {
            if (token.status === 'connected') {
                getUser();
            }
            else {
                self.user.notify();
            }
        });

    }

    function getUser() {
        FB.api('/me', {fields: ['email', 'name']}, function (response) {
            if (!response || response.error) {
                self.user.notify(response);

            } else {
                self.user.notify(response);
            }
        });
    }

    function getAuthToken() {
        return $q(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                resolve(response);
                self.authToken.notify(response);
            }, true);
        });
    }

    function getLibCheckCount() {
        return parseInt(MAX_LIB_LOAD_TIME_MS / LIB_LOAD_CHECK_INTERVAL_MS)
    }

    function getLibLoadStatus(loaded, elapsedTime) {

        if (loaded) {
            return STATUS.LOADED;
        }
        else {
            if (elapsedTime < MAX_LIB_LOAD_TIME_MS) {
                return STATUS.LOADING;
            }
            else {
                return STATUS.FAILED;
            }
        }
    }
}
