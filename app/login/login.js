angular
    .module('app.LoginCtrl', [])
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, account, $timeout, $state, facebook) {

    $scope.loginWithFacebook = loginWithFacebook;
    $scope.login = login;

    function loginWithFacebook() { console.log(111, 'loginWithFacebook');
        facebook.login().then(loginSuccess);
    }

    function login(email, password) {
        account.signIn(email, password)
            .then(loginSuccess, showError);
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

