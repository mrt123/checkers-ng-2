angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($q, $scope, games, $stateParams, GameMaster, RenderedBoard, $timeout, account) {

    var board;

    $scope.boardChangeEvent = $q.defer();

    activate();

    function activate() {
        games.get($stateParams.id).then(initGame);
        $scope.boardChangeEvent.promise.then(undefined, undefined, saveGameData);
    }

    function initGame(gameData) {            window.gameData = gameData;

        board = new RenderedBoard().initFromPlainFieldsObjects(gameData.fields);
        var gameMaster = new GameMaster(board);                         window.gameMaster = gameMaster;
        gameMaster.setActivePlayerColor(gameData.activePlayerColor);

        initGameScope(gameMaster, gameData);
    }
    
    function initGameScope(gameMaster, gameData) {
        $timeout(function () {
            $scope.gameMaster = gameMaster;
            $scope.board = gameMaster.board;
            $scope.playerColor = getPlayerColor(account, gameData);  // required to decide if move is legal 
            $scope.isBoardFlipped = !isPlayer1(account, gameData);
        });
    }

    function getPlayerColor(account, gameData) {
        if(isPlayer1(account, gameData)) {
            return gameData.p1Color;
        }
        else {
            return gameData.p2Color;
        }
    }

    function saveGameData() {
        var fieldData = board.toPlainObject().fields;

        games.saveCurrentGameAttributes({
            fields: fieldData,
            activePlayerColor: gameMaster.activePlayerColor   // TODO: toggling pColor should happen on backend
        });
    }

    function isPlayer1(account, gameData) {
        return (account.user.email === gameData.p1Email);
    }
}