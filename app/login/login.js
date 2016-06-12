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
        account.signIn(email, password, {
            success: loginSuccess, 
            fail: showError
        });
    }

    function loginSuccess() {
        $state.go('home');
    }

    function showError(user, error) {
        $timeout(function () {   // avoid existing digest
            $scope.error = error.message;
        });
    }
}

