angular
    .module('app.RootCtrl', [])
    .controller('RootCtrl', ['$uibModal', RootCtrl]);

function RootCtrl($uibModal) {
    var vm = this;

    vm.openSignUpModal = openSignUpModal;

    function openSignUpModal() {
        $uibModal.open({
            templateUrl: 'sign-up-modal/sign-up-modal.html',
            controller: 'SignUpCtrl'
        });
    }
}