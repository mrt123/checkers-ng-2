angular.module('app.SignUpCtrl', [])
    .controller('SignUpCtrl', SignUpCtrl);

function SignUpCtrl($scope, $uibModalInstance, account) {

    $scope.ok = function (username, password) {
        account.signUp(usarname, password);
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}