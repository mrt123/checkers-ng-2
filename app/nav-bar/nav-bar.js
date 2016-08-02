angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout, $state) {
    var vm = this;
    vm.showLoadingBar = true;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function activate() {
        facebook.libStatus.promise.then(undefined, undefined, onFacebookLibTransfer);
        account.userChange.promise.then(undefined, undefined, onUserChange);
        showProgressMsg('loading')
    }
    
    function onFacebookLibTransfer(transferStatus) {
        if(transferStatus === 'failed') {
            vm.showLoadingBar = false;
            vm.showError = true;
        }
    }
    
    function onUserChange() {
        hideProgressMsg();
        if(account.user) {
            vm.loggedIn = true;
            updateAccountScope(account.user, true);
        }
        else {
            vm.loggedIn = false;
        }
    }

    function logout() {
        showProgressMsg('logging out');
        account.signOut().then(function() {
            updateAccountScope({}, false);
            hideProgressMsg();
            $state.go('home');
        });
    }

    function updateAccountScope(user) {
        $timeout(function () { // avoid existing digest
            vm.username = user.playerName;
        });
    }
    
    function showProgressMsg(msg) {
        vm.loadingMessage = msg;
        vm.showLoadingBar = true;
        vm.showAccount = false
    }
    
    function hideProgressMsg() {
        vm.showLoadingBar = false;
        vm.showAccount = true;
    }
}