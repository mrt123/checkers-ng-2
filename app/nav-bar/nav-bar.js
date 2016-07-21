angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function activate() {
        facebook.libStatus.promise.then(undefined, undefined, setFacebookLoadStatus);
        //facebook.user.promise.then(undefined, undefined, setFacebookUserStatus);
        account.user.promise.then(undefined, undefined, reactToUserPresence);
    }

    function setFacebookLoadStatus(status) {
        $scope.facebookLoadStatus = status;
    }

    function setFacebookUserStatus(status) {
        $scope.facebookUserStatus = status;

        if(status !== 'connected') {
            vm.FBStatus = 'facebook user: ' + status;
            vm.showAccountMenu = true;
        }
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

    function logout() {
        account.signOut().then(function() {
            updateAccountScope({}, false);
        });
    }
}