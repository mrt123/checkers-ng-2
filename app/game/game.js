angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, $stateParams, Game) {

    var game = new Game();    window.game = game;
    var board = game.board;     window.scope = $scope;
    
    $scope.fields = game.board.fields;
    $scope.gameData = undefined;

    activate();

    function activate() {
        games.get($stateParams.id).then(setGameData);
    }

    function setGameData(game) {
        console.log($stateParams.id);
        $scope.gameData = game;
    }

}