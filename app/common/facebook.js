var module = angular.module('facebook', []);
module.service('facebook', function ($interval, $q, $timeout) {
    var self = this;
    var MAX_LOAD_TIME_MS = 5000;
    var INTERVAL_MS = 100;
    var STATUS = {
        LOADING: 'loading',
        LOADED: 'loaded',
        FAILED: 'failed'
    };

    this.libLoaded = false;
    this.libstatus = STATUS.LOADING;
    this.loadedCallbacks = [];

    this.checkLibStatus = checkLibStatus;
    this.getUser = getUser;
    this.onLoad = onLoad;

    function checkLibStatus(callback) {
        var elapsedTime = 0;

        var update = $interval(function () {
            elapsedTime = elapsedTime + INTERVAL_MS;

            var loaded = window.FacebookLoaded === true;

            self.libstatus = getLibLoadStatus(loaded, elapsedTime);
            console.log('checking FB lib status: ' + self.libstatus);
            callback(self.libstatus);

            if (loaded) {
                self.libLoaded = loaded;
                executeLoadCallbacks();
                $interval.cancel(update);
            }
        }, INTERVAL_MS, getLibCheckCount());
    }

    function getLibCheckCount() {
        return parseInt(MAX_LOAD_TIME_MS / INTERVAL_MS)
    }

    function getLibLoadStatus(loaded, elapsedTime) {

        if (loaded) {
            return STATUS.LOADED;
        }
        else {
            if (elapsedTime < MAX_LOAD_TIME_MS) {
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

    function executeLoadCallbacks() {
        angular.forEach(self.loadedCallbacks, function(callback) {
            callback();
        })
    }

    function onLoad(callback) {   // TODO: support multiple callbacks!
        self.loadedCallbacks.push(callback);
    }
});
