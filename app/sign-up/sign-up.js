angular
    .module('app.SignUpCtrl', [])
    .controller('SignUpCtrl', function ($scope, account, $timeout, $state, facebook) {

        $scope.signUp = signUp;
        $scope.loginWithFacebook = loginWithFacebook;        

        function signUp(email, password) {
            account.signUp(email, password, loginSuccess, showError);
        }

        function loginWithFacebook() {
            facebook.login(function (response) {
                loginSuccess();
            });
        }
        
        function loginSuccess() {
            $state.go('home');
        }

        function showError(error) {
            $timeout(function () {   // avoid existing digest
                $scope.error = error.message;
            });
        }
    });

