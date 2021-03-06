angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($q, $scope, games, $stateParams, GameMaster, RenderedBoard, $timeout, account) {

    var board;

    $scope.boardChangeEvent = $q.defer();

    activate();

    function activate() {
        games.get($stateParams.id).then(undefined, undefined, initGame); // todo replace initGame on update with updateGame
        $scope.boardChangeEvent.promise.then(undefined, undefined, saveGameData);
    }

    function initGame(gameData) {            window.gameData = gameData;
        console.log('initGame');
        board = new RenderedBoard().initFromPlainFieldsObjects(gameData.fields);
        var gameMaster = new GameMaster(board);                         window.gameMaster = gameMaster;
        gameMaster.setActivePlayerColor(gameData.activePlayerColor);

        initGameScope(gameMaster, gameData);
    }
    
    function initGameScope(gameMaster, gameData) {
        $timeout(function () {
            $scope.gameMaster = gameMaster;
            $scope.board = gameMaster.board;
            var playerColor = getPlayerColor(account, gameData);
            $scope.playerColor = playerColor;  // required to decide if move is legal 
            $scope.isBoardFlipped = (playerColor === 'white');
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