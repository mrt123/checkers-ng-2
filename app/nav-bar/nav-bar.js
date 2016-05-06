angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl($uibModal, account, $scope) {
    var ACCOUNT_DEFAULT_LABEL = 'My Account';
    var vm = this;

    vm.accountLabel = getAccountLabel();
    vm.openSignUpModal = openSignUpModal;
    vm.openLogInModal = openLogInModal;
    vm.logout = logout;
    vm.loginLabel = getLoginLabel();

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
}