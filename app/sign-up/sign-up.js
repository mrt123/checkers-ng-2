angular
    .module('app.SignUpCtrl', [])
    .controller('SignUpCtrl', SignUpCtrl);

function SignUpCtrl($scope, account, $timeout, $state, facebook) {

    $scope.signUp = signUp;
    $scope.loginWithFacebook = loginWithFacebook;

    function signUp(email, password, playerName) {
        account.signUp(email, password, playerName, {
            success: signUpSuccess,
            fail: showError
        });
    }

    function loginWithFacebook() {
        facebook.login(function (response) {
            signUpSuccess();
        });
    }

    function signUpSuccess() {
        $state.go('home');
    }

    function showError(user, error) {
        $timeout(function () {   // avoid existing digest
            $scope.error = error.message;
        });
    }
}