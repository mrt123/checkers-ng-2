angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', ['$uibModal', NavBarCtrl]);

function NavBarCtrl($uibModal) {
    var vm = this;

    vm.openSignUpModal = openSignUpModal;

    function openSignUpModal() {
        $uibModal.open({
            templateUrl: 'sign-up-modal/sign-up-modal.html',
            controller: 'SignUpModalCtrl',
            size: 'sm'
        });
    }
}