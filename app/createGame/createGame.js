angular
    .module('createGame', [])
    .controller('CreateGameCtrl', CreateGameCtrl);


function CreateGameCtrl($scope, games, $state, Board) {

    $scope.createGame = createGame;

    activate();

    function activate() {

    }

    function createGame(invitedPlayerEmail) {
        var board = new Board().init();
        var fieldsData = board.toPlainObject().fields;
        
        games.create({
            p1Email: Parse.User.current().get('username'),
            p2Email: invitedPlayerEmail,
            nextPlayerColor: 'black',
            fields: fieldsData
        }).then(function () {
            $state.go('myGames');
        });
    }
}