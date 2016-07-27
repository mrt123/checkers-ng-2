angular
    .module('app.AccountOverViewCtrl', [])
    .controller('AccountOverViewCtrl', AccountOverViewCtrl);

function AccountOverViewCtrl($scope, $timeout, account) {
    $scope.user = account.user;
    
    activate();
    
    function activate() {
        updateAccountScope(account.user);
        account.userChange.promise.then(undefined, undefined, updateAccountScope);
    }

    function updateAccountScope(user) {
        $timeout(function () { // avoid existing digest
            $scope.user = account.user;
        });
    }
}

