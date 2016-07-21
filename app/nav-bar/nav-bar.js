angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function logout() {
        // TODO : put progress icon after click!
        
        account.signOut(function () {
            updateAccountScope({}, false);
        });
    }

    // PRIVATE METHODS
    function activate() {
        account.deferredRegister.promise.then(undefined, undefined, reactToUserPresence);
        account.deferredLogin.promise.then(undefined, undefined, reactToUserPresence);

        facebook.deferredLibLoad.promise.then(undefined, undefined, updateFBLoadStatus);
        facebook.checkLibStatus();
    }

    function updateFBLoadStatus(status){
        vm.FBLoadStatus = status;
    }
    
    function reactToUserPresence(user) {
        updateAccountScope(user, true);
    }

    function updateAccountScope(user, logged) {
        $timeout(function () { // avoid existing digest
            vm.username = user.playerName;
            vm.loggedIn = logged;
        });
    }
}