angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, $stateParams, GameMaster, RenderedBoard) {

    var gameMaster = new GameMaster();    window.gameMaster = gameMaster;
    gameMaster.startGame({
        firstPlayerColor: 'black'
    });
    
    $scope.renderedBoard = new RenderedBoard(gameMaster.board);
    $scope.playerColor = 'black';

    activate();

    function activate() {
        games.get($stateParams.id).then(setGameData);
    }

    function setGameData(game) {
        $scope.gameData = game;
    }

}