angular
    .module('app.FooterCtrl', [])
    .controller('FooterCtrl', FooterCtrl);

function FooterCtrl($scope, account, facebook) {

    $scope.facebookLoadStatus = 'loading';
    $scope.facebookUserStatus = 'not logged';
    $scope.accountStatus = 'not logged';

    activate();

    function activate() {
        facebook.libStatus.promise.then(undefined, undefined, setFacebookLoadStatus);
        facebook.user.promise.then(undefined, undefined, setFacebookUserStatus);
        account.user.promise.then(undefined, undefined, setAccountStatus);
    }

    function setFacebookLoadStatus(status) {
        $scope.facebookLoadStatus = status;
    }

    function setFacebookUserStatus(status) {
        $scope.facebookUserStatus = status;
    }

    function setAccountStatus(status) {
        $scope.accountStatus = status;
    }
}

