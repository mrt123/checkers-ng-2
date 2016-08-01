angular
    .module('createGame', [])
    .controller('CreateGameCtrl', CreateGameCtrl);


function CreateGameCtrl($scope, games, $state, account) {

    $scope.createGame = createGame;

    activate();

    function activate() {

    }

    function createGame(invitedPlayerEmail) {
        console.log('invitedPlayerEmail', invitedPlayerEmail);
        games.create({
            p1Email: Parse.User.current().get('username'),
            p2Email: invitedPlayerEmail,
            status: 'waiting for opponent to accept'
        });
        $state.go('myGames');
    }
}