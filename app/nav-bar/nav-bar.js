angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl($uibModal, account, $scope, facebook, $timeout) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;

    account.onSignUpSuccess(signUpSuccess);
    account.onSignInSuccess(signUpSuccess);

    facebook.checkLibStatus(function(status){
        vm.FBLoadStatus = status;
    });

    facebook.onLoad(function(){
        reactToFacebookStatus();
    });

    facebook.onLogin(function(){
        reactToFacebookStatus();
    });

    function logout() {
        account.signOut().then(function () { 
            updateAccountScope(undefined, false);
        });
    }

    // PRIVATE METHODS
    function reactToFacebookStatus() {
        // TODO: relace with existing facebook.getUser.then(...)
        FB.getLoginStatus(function(response) {      console.log(response.status);

            if (response.status === 'connected') {
                initFacebookUser();

            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.

            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.

            }
        });
    }
    
    function initFacebookUser() {
        FB.api('/me', function (user) {   console.log(user)
            $scope.$apply(function () {
                // TODO:  check if user has regular account
                // TODO:  create new account for him if necessary
                // TODO:  set username etc in account
                vm.loggedIn = true;
                vm.username = user.name;
            });
        });
    }
    
    function signUpSuccess(val) {
        updateAccountScope(val, true);
    }

    function updateAccountScope(val, logged) {
        $timeout(function () { // avoid existing digest
            vm.username = val;
            vm.loggedIn = logged;
        });
    }
}