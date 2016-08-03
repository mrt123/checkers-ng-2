angular
    .module('app.SignUpCtrl', [])
    .controller('SignUpCtrl', SignUpCtrl);

function SignUpCtrl($scope, account, $timeout, $state, facebook) {

    $scope.signUp = signUp;
    $scope.loginWithFacebook = loginWithFacebook;

    function signUp(email, password, playerName) {
        account.signUp(email, password, playerName)
            .then(signUpSuccess, showError);
    }

    function loginWithFacebook() {
        account.loginWithFB().then(signUpSuccess);
    }

    function signUpSuccess() {
        $state.go('myGames');
    }

    function showError(error) {
        $timeout(function () {   // avoid existing digest
            $scope.error = error.message;
        });
    }
}