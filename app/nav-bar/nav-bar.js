angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl($uibModal, account, $scope) {
    var ACCOUNT_DEFAULT_VALUE = 'account';
    var vm = this;

    vm.accountValue = ACCOUNT_DEFAULT_VALUE;
    vm.openSignUpModal = openSignUpModal;
    vm.openLogInModal = openLogInModal;
    vm.logout = logout;

    function openSignUpModal() {
        $uibModal.open(getModalConfig('register'));
    }

    function openLogInModal() {
        $uibModal.open(getModalConfig('login'));
    }

    function logout() {
        account.signOut().then(function () {
            updateAccountScope(ACCOUNT_DEFAULT_VALUE);
        });
    }

    // PRIVATE METHODS

    function getModalConfig(type) {
        return {
            templateUrl: 'sign-up-modal/sign-up-modal.html',
            controller: 'SignUpModalCtrl',
            size: 'sm',
            resolve: {
                type: function () {
                    return type;
                },
                callback: function () {
                    return updateAccountScope
                }
            }
        }
    }

    function updateAccountScope(val) {
        $scope.$apply(function () {
            vm.accountValue = val;
        });
    }
}