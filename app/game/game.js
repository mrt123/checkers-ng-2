angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, $stateParams, GameMaster, RenderedBoard) {

    var board = new RenderedBoard();
    var gameMaster = new GameMaster(board);    window.gameMaster = gameMaster;
    gameMaster.startGame({
        firstPlayerColor: 'black'
    });
    
    $scope.gameMaster = gameMaster;
    $scope.board = gameMaster.board;
    $scope.playerColor = 'black';

    activate();

    function activate() {
        games.get($stateParams.id).then(setGameData);
    }

    function setGameData(game) {
        $scope.gameData = game;
    }

}