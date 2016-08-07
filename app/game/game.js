angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games, $stateParams, GameMaster) {

    var game = new GameMaster();    window.game = game;
    
    $scope.fields = game.board.fields;
    $scope.pins = game.board.pins;

    activate();

    function activate() {
        games.get($stateParams.id).then(setGameData);
    }

    function setGameData(game) {
        $scope.gameData = game;
    }

}