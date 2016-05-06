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

    function getAccountLabel() {
        return account.getUsername() || ACCOUNT_DEFAULT_LABEL;
    }

    function openSignUpModal() {
        $uibModal.open(getModalConfig('register'));
    }

    function openLogInModal() {
        $uibModal.open(getModalConfig('login'));
    }

    function logout() {
        account.signOut().then(function () {
            updateAccountLabel(ACCOUNT_DEFAULT_LABEL);
        });
    }

    // PRIVATE METHODS

    function getModalConfig(type) {
        return {
            templateUrl: 'account-action-modal/account-action-modal.html',
            controller: 'AccountActionModalCtrl',
            size: 'sm',
            resolve: {
                type: function () {
                    return type;
                },
                callback: function () {
                    return updateAccountLabel
                }
            }
        }
    }

    function updateAccountLabel(val) {
        $scope.$apply(function () {
            vm.accountLabel = val;
        });
    }
}