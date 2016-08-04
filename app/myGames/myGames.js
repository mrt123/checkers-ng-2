angular
    .module('app.MyGamesCtrl', [])
    .controller('MyGamesCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, $state) {
    $scope.gamesCreated = [];
    $scope.gamesInvitedTo = [];
    $scope.showGames = showGames;
    $scope.playGame = playGame;

    activate();

    function activate() {
        games.updateEvent.promise.then(undefined, undefined, updateScope);
        games.getAll();
    }

    function updateScope() {
        $scope.gamesCreated = games.created;
        $scope.gamesInvitedTo = games.invitedTo;
    }
    
    function showGames(games) {
        return games.length > 0;
    }
    
    function playGame(game) {
        console.log('play', game);
        $state.go('game', {id: game['objectId']});
    }
}