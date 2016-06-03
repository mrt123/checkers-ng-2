angular
    .module('app.LoginCtrl', [])
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, account, $timeout, $state, facebook) {

    $scope.loginWithFacebook = loginWithFacebook;
    $scope.login = login;

    function loginWithFacebook() {
        facebook.login(function (response) {
            loginSuccess();
        });
    }

    function login(email, password) {
        account.signIn(email, password, loginSuccess, showError);
    }

    function loginSuccess() {
        $state.go('home');
    }

    function showError(error) {
        $timeout(function () {   // avoid existing digest
            $scope.error = error.message;
        });
    }
}

