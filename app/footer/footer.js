angular
    .module('app.FooterCtrl', [])
    .controller('FooterCtrl', FooterCtrl);

function FooterCtrl($scope, account, facebook) {

    $scope.facebookLoadStatus = 'loading';
    $scope.facebookAuthStatus = 'undefined';
    $scope.playerName = 'undefined';

    activate();

    function activate() {
        facebook.libStatus.promise.then(undefined, undefined, setFacebookLoadStatus);
        facebook.authToken.promise.then(undefined, undefined, setFacebookAuthStatus);
        account.user.promise.then(undefined, undefined, setAccountStatus);
    }

    function setFacebookLoadStatus(status) {
        $scope.facebookLoadStatus = status;
    }

    function setFacebookAuthStatus(token) {
        $scope.facebookAuthStatus = '[' + token.status +']';
    }

    function setAccountStatus(user) {
        if(user) {
            $scope.playerName = user.playerName;
        }
        else {
            $scope.playerName = 'undefined';
        }
    }
}

