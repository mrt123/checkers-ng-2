angular
    .module('facebook', ['AbstractAccount'])
    .service('facebook', facebook);

function facebook($interval, $q, AbstractAccount) {
    var self = new AbstractAccount('facebook');
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

    self.onLoadCallbacks = [];
    self.onLoad = addOnLoadCallback;
    self.onLogin = self.addOnLoginCallback;

    self.onLogOutCallbacks = [];
    self.onLogOut = addOnLogOutCallback;
    
    return self;

    function checkLibStatus(callback) { 
        var elapsedTime = 0;

        var update = $interval(function () {
            elapsedTime = elapsedTime + LIB_LOAD_CHECK_INTERVAL_MS;

            var loaded = window.FacebookLoaded === true;

            self.libstatus = getLibLoadStatus(loaded, elapsedTime);
            console.log('checking FB lib status: ' + self.libstatus);
            callback(self.libstatus);

            if (loaded) {
                self.executeCallbacks(self.onLoadCallbacks);
                $interval.cancel(update);
            }
        }, LIB_LOAD_CHECK_INTERVAL_MS, getLibCheckCount());
    }

    function login(callback) {
        FB.login(function (response) {
            callback(response);
            self.executeLoginSuccessCallbacks([]);
        }, {scope: 'public_profile,email'});
    }

    function logOut(callback) {
        FB.logout(function(response) {
            callback(response);
            self.executeCallbacks(self.onLogOutCallbacks);
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
}
