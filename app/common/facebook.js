var module = angular.module('facebook', []);
module.service('facebook', function ($interval, $q, $timeout) {
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
    this.login = login;
    this.getUser = getUser;

    this.onLoadCallbacks = [];
    this.onLoad = addOnLoadCallback;

    this.onLoginCallbacks = [];
    this.onLogin = addOnLoginCallback;

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

    function getUser() {
        var deferred = $q.defer();

        FB.api('/me', function (user) {
            deferred.resolve(user);
        });

        return deferred.promise;
    }

    function addOnLoadCallback(callback) {
        self.onLoadCallbacks.push(callback);
    }

    function addOnLoginCallback(callback) {
        self.onLoginCallbacks.push(callback);
    }

    function executeCallbacks(callbacks) {
        angular.forEach(callbacks, function(callback) {
            callback();
        })
    }
});
