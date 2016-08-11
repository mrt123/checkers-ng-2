angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($q, $scope, games, $stateParams, GameMaster, RenderedBoard, $timeout) {

    var board;
    $scope.playerColor = 'black';
    $scope.boardChangeEvent = $q.defer();

    activate();

    function activate() {
        games.get($stateParams.id).then(initGame);
        $scope.boardChangeEvent.promise.then(undefined, undefined, saveGameData);
    }

    function initGame(gameData) {            window.gameData = gameData;

        board = new RenderedBoard().initFromPlainFieldsObjects(gameData.fields);
        var gameMaster = new GameMaster(board);                         window.gameMaster = gameMaster;
        gameMaster.setNextPlayerColor(gameData.nextPlayerColor);

        initGameScope(gameMaster);
    }
    
    function initGameScope(gameMaster) {
        $timeout(function () {
            $scope.gameMaster = gameMaster;
            $scope.board = gameMaster.board;
        });
    }

    function saveGameData() {
        var fieldData = board.toPlainObject().fields;

        games.saveCurrentGameAttributes({
            fields: fieldData,
            nextPlayerColor: gameMaster.nextPlayerColor   // TODO: toggling pColor should happen on backend
        });
    }
}