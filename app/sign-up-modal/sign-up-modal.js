angular.module('app.SignUpModalCtrl', [])
    .controller('SignUpModalCtrl', SignUpModalCtrl);

function SignUpModalCtrl($scope, $uibModalInstance, account) {

    $scope.ok = function (username, password) {
        account.signUp(username, password);
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}