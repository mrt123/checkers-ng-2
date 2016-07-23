angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout) {
    var vm = this;
    vm.showLoadingBar = true;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function activate() {
        facebook.libStatus.promise.then(undefined, undefined, reactToFacebookLoad);
        account.user.promise.then(undefined, undefined, onUserInfo);
    }
    
    function reactToFacebookLoad(libStatus) {
        if(libStatus === 'failed') {
            vm.showLoadingBar = false;
            vm.showError = true;
        }
    }
    
    function onUserInfo(user) {
        vm.showLoadingBar = false;
        vm.showAccount = true;
        if(user) {
            updateAccountScope(user, true);
        }
    }

    function updateAccountScope(user, logged) {
        $timeout(function () { // avoid existing digest
            vm.username = user.playerName;
            vm.loggedIn = logged;
        });
    }

    function logout() {
        account.signOut().then(function() {
            updateAccountScope({}, false);
        });
    }
}