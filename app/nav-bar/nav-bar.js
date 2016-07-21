angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function logout() {
        account.signOut().then(function() {
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
 
    function updateFBLoadStatus(status){  // TODO: case when FB loaded but still checking if FB user logged 
        vm.showAccountMenu = status === 'loaded';
        vm.showLibIsLoading = status !== 'loaded';
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