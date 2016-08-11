angular
    .module('createGame', [])
    .controller('CreateGameCtrl', CreateGameCtrl);


function CreateGameCtrl($scope, games, $state, Board, Player, GameMaster, account) {

    $scope.createGame = createGame;

    activate();

    function activate() {

    }

    function createGame(invitedPlayerEmail, playerColor) {
        var board = new Board().init();
        var fieldsData = board.toPlainObject().fields;
        
        // TODO : figure out optimal way to store related objects : http://parseplatform.github.io/docs/js/guide/#relational-data
        
        games.create({
            p1Email: account.user.email,
            p1Color: playerColor,
            p2Email: invitedPlayerEmail,
            p2Color: GameMaster.getNextPlayerColor(playerColor),
            activePlayerColor: playerColor,
            fields: fieldsData
        }).then(function () {
            $state.go('myGames');
        });
    }
}