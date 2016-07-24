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
        facebook.libStatus.promise.then(undefined, undefined, onFacebookLibTransfer);
        account.userChange.promise.then(undefined, undefined, onUserChange);
    }
    
    function onFacebookLibTransfer(transferStatus) {
        if(transferStatus === 'failed') {
            vm.showLoadingBar = false;
            vm.showError = true;
        }
    }
    
    function onUserChange() {
        vm.showLoadingBar = false;
        vm.showAccount = true;
        if(account.user) {
            vm.loggedIn = true;
            updateAccountScope(account.user, true);
        }
        else {
            vm.loggedIn = false;
        }
    }

    function updateAccountScope(user) {
        $timeout(function () { // avoid existing digest
            vm.username = user.playerName;
        });
    }

    function logout() {
        account.signOut().then(function() {
            updateAccountScope({}, false);
        });
    }
}