angular
    .module('app.MyGamesCtrl', [])
    .controller('MyGamesCtrl', MyGamesCtrl);

function MyGamesCtrl($scope, games) {
    $scope.games = [0,1,2];
    $scope.createGame = createGame;

    activate();

    function activate() {
        games.getAll();
        games.updateEvent.promise.then(undefined, undefined, updateScope);
    }
    
    function updateScope() {
        $scope.games = games.all;
    }

    function createGame() {
        games.create({
            score: 1337,
            playerName: "Sean Plott",
            cheatMode: false
        });
    }
}