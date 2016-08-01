angular
    .module('app.MyGamesCtrl', [])
    .controller('MyGamesCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, account) {
    $scope.games = [];

    activate();

    function activate() {
        games.updateEvent.promise.then(undefined, undefined, updateScope);
        games.getAll();
    }

    function updateScope() {
        $scope.games = games.created;
        $scope.gamesInvitedTo = games.invitedTo;
    }
}