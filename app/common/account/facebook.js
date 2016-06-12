angular
    .module('facebook', [])
    .service('facebook', facebook);

function facebook($interval, $q, $timeout) {
    var self = this;
    var MAX_LIB_LOAD_TIME_MS = 5000;
    var LIB_LOAD_CHECK_INTERVAL_MS = 100;
    var STATUS = {
        LOADING: 'loading',
        LOADED: 'loaded',
        FAILED: 'failed'
    };

    this.libstatus = STATUS.LOADING;

    this.checkLibStatus = checkLibStatus;
    this.getLoginStatus = getLoginStatus;
    this.login = login;
    this.logOut = logOut;
    this.getUser = getUser;

    this.onLoadCallbacks = [];
    this.onLoad = addOnLoadCallback;

    this.onLoginCallbacks = [];
    this.onLogin = addOnLoginCallback;

    this.onLogOutCallbacks = [];
    this.onLogOut = addOnLogOutCallback;

    function checkLibStatus(callback) {
        var elapsedTime = 0;

        var update = $interval(function () {
            elapsedTime = elapsedTime + LIB_LOAD_CHECK_INTERVAL_MS;

            var loaded = window.FacebookLoaded === true;

            self.libstatus = getLibLoadStatus(loaded, elapsedTime);
            console.log('checking FB lib status: ' + self.libstatus);
            callback(self.libstatus);

            if (loaded) {
                executeCallbacks(self.onLoadCallbacks);
                $interval.cancel(update);
            }
        }, LIB_LOAD_CHECK_INTERVAL_MS, getLibCheckCount());
    }

    function login(callback) {
        FB.login(function (response) {
            callback(response);
            executeCallbacks(self.onLoginCallbacks);
        }, {scope: 'public_profile,email'});
    }

    function logOut(callback) {
        FB.logout(function(response) {
            callback(response);
            executeCallbacks(self.onLogOutCallbacks);
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
    
    function getLoginStatus(callback) {
        FB.getLoginStatus(function(response) {
            callback(response.status)
        },true);
    }

    function addOnLoadCallback(callback) {
        self.onLoadCallbacks.push(callback);
    }

    function addOnLoginCallback(callback) {
        self.onLoginCallbacks.push(callback);
    }

    function addOnLogOutCallback(callback) {
        self.onLogOutCallbacks.push(callback);
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

    function executeCallbacks(callbacks) {
        angular.forEach(callbacks, function(callback) {
            callback();
        })
    }
}
