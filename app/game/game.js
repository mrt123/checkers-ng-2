angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, $stateParams, GameMaster, RenderedBoard) {

    var game = new GameMaster();    window.game = game;
    
    $scope.board = new RenderedBoard(game.board);

    activate();

    function activate() {
        games.get($stateParams.id).then(setGameData);
    }

    function setGameData(game) {
        $scope.gameData = game;
    }

}