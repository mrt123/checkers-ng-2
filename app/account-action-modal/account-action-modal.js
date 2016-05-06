angular.module('app.AccountActionModalCtrl', [])
    .controller('AccountActionModalCtrl', AccountActionModalCtrl);

function AccountActionModalCtrl($scope, $uibModalInstance, account, type, config) {

    $scope.ok = ok;
    $scope.cancel = cancel;
    $scope.text = getText();

    function ok(username, password) {
        config.action(username, password,
            actionSuccess,
            showError
        );
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    function getRegisterText() {
        return {
            heading: 'Sign Up',
            message: 'Sign up and keep yor games saved...',
            buttonLabel: 'Sign Up Now'
        }
    }

    // PRIVATE METHODS

    function actionSuccess() {
        config.success.apply(this, arguments);
        $uibModalInstance.close();
    }

    function getText() {
        if (type === 'register') return getRegisterText();
        if (type === 'login') return getLoginText();
    }

    function getLoginText() {
        return {
            heading: 'Login',
            message: 'Login to existing account',
            buttonLabel: 'Login'
        }
    }

    function showError(error) {
        $scope.$apply(function () {
            $scope.error = error.message;
        });
    }
}