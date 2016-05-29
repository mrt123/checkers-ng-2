angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl($uibModal, account, $scope, facebook, $interval) {
    var ACCOUNT_DEFAULT_LABEL = 'My Account';
    var vm = this;

    vm.accountLabel = getAccountLabel();
    vm.openSignUpModal = openSignUpModal;
    vm.openLogInModal = openLogInModal;
    vm.logout = logout;
    vm.loginLabel = getLoginLabel();


    this.loginWithFacebook = loginWithFacebook;

    facebook.checkLibStatus(function(status){
        vm.FBLoadStatus = status;
    });

    facebook.onLoad(function(){
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
    });

    function initFacebookUser() {
        FB.api('/me', function (user) {
            $scope.$apply(function () {
                vm.FBUser = user.name;
            });
        });
    }

    function loginWithFacebook() {
        FB.login(function(response){
            debugger;
        }, {scope: 'public_profile,email'});
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
            updateAccountLabel(ACCOUNT_DEFAULT_LABEL);
        });
    }

    function getLoginLabel() {
        if (account.getUsername()) {
            return 'login to another account'
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

    function updateAccountLabel(val) {
        $scope.$apply(function () {
            vm.accountLabel = val;
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