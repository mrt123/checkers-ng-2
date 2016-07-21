angular
    .module('facebook', [])
    .service('facebook', facebook);

function facebook($interval, $q) {
    var self = {};
    var MAX_LIB_LOAD_TIME_MS = 5000;
    var LIB_LOAD_CHECK_INTERVAL_MS = 100;
    var STATUS = {
        LOADING: 'loading',
        LOADED: 'loaded',
        FAILED: 'failed'
    };

    self.libstatus = STATUS.LOADING;

    self.checkLibStatus = checkLibStatus;
    self.getLoginStatus = getLoginStatus;
    self.login = login;
    self.logOut = logOut;
    self.getUser = getUser;

    self.deferredLibLoad = $q.defer();
    self.deferredLogin = $q.defer();
    self.deferredLogout = $q.defer();  

    return self;

    function checkLibStatus() {
        var elapsedTime = 0;

        var update = $interval(function () {
            elapsedTime = elapsedTime + LIB_LOAD_CHECK_INTERVAL_MS;
            var loaded = window.FacebookLoaded === true;

            self.libstatus = getLibLoadStatus(loaded, elapsedTime);
            console.log('checking FB lib status: ' + self.libstatus);

            self.deferredLibLoad.notify(self.libstatus);

            if (loaded) {
                $interval.cancel(update);
            }
        }, LIB_LOAD_CHECK_INTERVAL_MS, getLibCheckCount());
    }

    function login() {
        return $q(function (resolve, reject) {
            FB.login(function (response) {
                resolve(response);
                self.deferredLogin.notify(response);
            }, {scope: 'public_profile,email'});
        });
    }

    function logOut() {
        return $q(function (resolve, reject) {
            FB.logout(function (response) {
                resolve(response);
                self.deferredLogout.notify(response);
            });
        });
    }

    function getUser() {
        var deferred = $q.defer();

        FB.api('/me', {fields: ['email', 'name']}, function (response) {
            if (!response || response.error) {
                deferred.reject(response);

            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function getLoginStatus() {
        return $q(function (resolve, reject) {
            FB.getLoginStatus(function (response) {
                resolve(response.status)
            }, true);
        });
    }

    // PRIVATE METHODS

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
