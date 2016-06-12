angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function logout() {
        account.signOut().then(function () { 
            updateAccountScope({}, false);
        });
    }

    // PRIVATE METHODS
    function activate() {
        facebook.checkLibStatus(reactToFacebookLibLoadStatus);
        account.onSignUpSuccess(reactToUserPresence);
        account.onSignInSuccess(reactToUserPresence);
    }

    function reactToFacebookLibLoadStatus(status){
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