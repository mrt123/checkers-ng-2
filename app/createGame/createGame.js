angular
    .module('createGame', [])
    .controller('CreateGameCtrl', CreateGameCtrl);


function CreateGameCtrl($scope, games, $state, account) {

    $scope.createGame = createGame;

    activate();

    function activate() {

    }

    function createGame(invitedPlayerEmail) {
        games.create({
            p1Email: Parse.User.current().get('username'),
            p2Email: invitedPlayerEmail,
            status: 'not started'
        }).then(function () {
            $state.go('myGames');
        });
    }
}