angular
    .module('app.AccountOverViewCtrl', [])
    .controller('AccountOverViewCtrl', AccountOverViewCtrl);

function AccountOverViewCtrl($scope, $timeout, account) {
    console.log(account.user);
    $scope.user = account.user;
    
    activate();
    
    function activate() {
        updateAccountScope(account.user.promise);
        account.userChange.promise.then(undefined, undefined, updateAccountScope);
    }

    function updateAccountScope(user) { console.log(user)
        console.log(account.user);
        $timeout(function () { // avoid existing digest
            $scope.user = account.user;
        });
    }
}

