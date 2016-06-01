angular
    .module('app.SignUpCtrl', [])
    .controller('SignUpCtrl', function ($scope, account, $timeout) {

        $scope.loginWithFacebook = loginWithFacebook;

        $scope.signUp = function (email, password) {
            account.signUp(email, password, undefined, showError);
        };


        function loginWithFacebook() {
            FB.login(function(response){
                initFacebookUser();
            }, {scope: 'public_profile,email'});
        }

        function initFacebookUser() {
            FB.api('/me', function (user) {
                $scope.$apply(function () {
                    account.loginFacebookUser(user)
                    $scope.FBUser = user.name;
                });
            });
        }
        
        function showError(error) {
            $timeout(function () {   // avoid existing digest
                $scope.error = error.message;
            });
        }
    });

