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
        showProgressMsg('loading');
        setAccountScope();
        facebook.libStatus.promise.then(undefined, undefined, onFacebookLibTransfer);
        account.userChange.promise.then(undefined, undefined, setAccountScope);
    }
    
    function onFacebookLibTransfer(transferStatus) {
        if(transferStatus === 'failed') {
            vm.showLoadingBar = false;
            vm.showError = true;
        }
        if(transferStatus === 'loaded') {
            showAccount();
        }
    }

    function logout() {
        showProgressMsg('logging out');
        account.signOut().then(function() {
            setAccountScope();
            showAccount();
            $state.go('home');
        });
    }

    function setAccountScope() {

        $timeout(function () { // avoid existing digest
            var usr = account.user;

            if(usr) {
                vm.loggedIn = true;
                vm.username = usr.playerName;
            }
            else {
                vm.loggedIn = false;
            }
        });
    }
    
    function showProgressMsg(msg) {
        vm.loadingMessage = msg;
        vm.showLoadingBar = true;
        vm.showAccount = false
    }
    
    function showAccount() {
        vm.showLoadingBar = false;
        vm.showAccount = true;
    }
}