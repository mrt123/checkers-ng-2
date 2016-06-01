angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl($uibModal, account, $scope, facebook) {
    var ACCOUNT_DEFAULT_LABEL = 'My Account';
    var vm = this;
    vm.loggedIn = false;

    vm.accountLabel = getAccountLabel();
    vm.openSignUpModal = openSignUpModal;
    vm.openLogInModal = openLogInModal;
    vm.logout = logout;
    vm.loginLabel = getLoginLabel();

    account.onSignUpSuccess(signUpSuccess);


    facebook.checkLibStatus(function(status){
        vm.FBLoadStatus = status;
    });

    facebook.onLoad(function(){
        reactToFacebookStatus();
    });

    facebook.onLogin(function(){
        reactToFacebookStatus();
    });
    
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

    function getAccountLabel() {
        return account.getUsername() || ACCOUNT_DEFAULT_LABEL;
    }

    function openSignUpModal() {
        $uibModal.open(getModalConfig('register', account.signUp));
    }

    function openLogInModal() {
        $uibModal.open(getModalConfig('login', account.signIn));
    }

    function logout() {
        account.signOut().then(function () {
            vm.loggedIn = false;
        });
    }

    function getLoginLabel() {
        if (account.getUsername()) {
            return 'Login to another account'
        }
        else {
            return 'login';
        }
    }

    // PRIVATE METHODS

    function getModalConfig(type, action) {
        return {
            templateUrl: 'account-action-modal/account-action-modal.html',
            controller: 'AccountActionModalCtrl',
            size: 'sm',
            resolve: {
                config: function () {
                    return {
                        type: type,
                        action: action,
                        actionSuccess: updateAccountLabel
                    }
                }
            }
        }
    }

    function signUpSuccess(val) {
        vm.loggedIn = true;
        updateAccountLabel(val);
    }

    function updateAccountLabel(val) {
        $scope.$apply(function () {
            vm.username = val;
            vm.loginLabel = getLoginLabel();
        });
    }


    function updateFBStatus(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.

            FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });


        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
    }
}