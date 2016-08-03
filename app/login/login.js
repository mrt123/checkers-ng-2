angular
    .module('app.LoginCtrl', [])
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, account, $timeout, $state, facebook) {

    $scope.loginWithFacebook = loginWithFacebook;
    $scope.login = login;

    function loginWithFacebook() {
        account.loginWithFB().then(loginSuccess);
    }

    function login(email, password) {
        account.login(email, password)
            .then(loginSuccess, showError);
    }

    function loginSuccess() {
        $state.go('myGames');
    }

    function showError(error) {
        $timeout(function () {   // avoid existing digest
            $scope.error = error.message;
        });
    }
}

