angular
    .module('app.GameCtrl', [])
    .controller('GameCtrl', MyGamesCtrl);

function MyGamesCtrl($q, $scope, games, $stateParams, GameMaster, RenderedBoard, $timeout) {

    var board = new RenderedBoard();
    board.init();
    var gameMaster = new GameMaster(board);
    var gameData = undefined;

    window.gameMaster = gameMaster;
    gameMaster.startGame({
        firstPlayerColor: 'black'
    });

    $scope.gameMaster = gameMaster;
    $scope.board = gameMaster.board;
    $scope.playerColor = 'black';
    $scope.boardChangeEvent = $q.defer();

    activate();

    function activate() {
        games.get($stateParams.id).then(setGameData);

        $scope.boardChangeEvent.promise.then(undefined, undefined, saveGameData);
    }

    function setGameData(game) { console.log(game);
        window.gameData = game;
        gameData = game;
        //board.fields = game.fields;
        $timeout(function () { 
            //$scope.board = board;  console.log($scope.board);
        });
        

    }

    function saveGameData() {
        console.log('board move executed', board);
        
        var fieldData = getFieldData(board.fields);
        var status = getGameStatus(gameMaster);

        games.saveCurrentGameAttributes({
            fields: fieldData,
            status: status
        });
    }

    function getGameStatus(gameMaster) {
        var nextPlayer = gameMaster.nextPlayerColor;
        return nextPlayer + 'turn';
    }

    function getFieldData(fields) {
        var fieldData = [];
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            fieldData.push({
                number: field.number,
                pin: field.pin
            });
        }
        return fieldData;
    }

}