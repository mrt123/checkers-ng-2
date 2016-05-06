angular.module('app.AccountActionModalCtrl', [])
    .controller('AccountActionModalCtrl', AccountActionModalCtrl);

function AccountActionModalCtrl($scope, $uibModalInstance, account, type, callback) {


    var SIGN_UP_HEADING = 'Sign Up';
    var SIGN_UP_MESSAGE = 'Sign up and keep yor games saved...';
    var LOGIN_HEADING = 'Login';
    var LOGIN_MESSAGE = 'Login to existing account';



    $scope.heading = getHeading();
    $scope.message = getMessage();

    $scope.ok = function (username, password) {
        if(type === 'register') {
            account.signUp(username, password).then(callback);
        }
        else if (type === 'login') {
            account.signIn(username, password).then(callback);
        }
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function getHeading() {
        if(type === 'register') {
            return SIGN_UP_HEADING;
        }
        if(type === 'login') {
            return LOGIN_HEADING;
        }
    }

    function getMessage() {
        if(type === 'register') {
            return SIGN_UP_MESSAGE;
        }
        if(type === 'login') {
            return LOGIN_MESSAGE;
        }
    }
}