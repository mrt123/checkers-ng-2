angular
    .module('games', [])
    .factory('games', games);

function games($q) {
    var self = {
        getAll: getAll,
        create: create,
        all : [],
        updateEvent: $q.defer()
    };

    activate();
    return self;
    
    function activate() {
        self.getAll();
    }

    function getAll() {
        return $q(function (resolve, reject) {
            var game = Parse.Object.extend("Game");
            var query = new Parse.Query(game);
            query.find({
                success: function (results) {           console.log("GET games: " + results.length);
                    var json = convertArrayToJson(results);
                    self.all = json;
                    self.updateEvent.notify();
                    resolve(json);
                },
                error: function (error) {                   console.log("Error: " + error.message);
                    self.updateEvent.notify();
                    reject(error);
                }
            });
        });
    }

    function create(rawObject) {
        var Game = Parse.Object.extend("Game");
        var game = new Game();
        game.setACL(new Parse.ACL(Parse.User.current()));

        return $q(function () {
            game.save(rawObject, {
                success: function(game) {               console.log("POST game :" + game.id);
                    var json = game.toJSON();
                    self.all.push(json);
                    self.updateEvent.notify();
                    resolve(game.toJSON());          
                },
                error: function(game, error) {              console.log("Error: " + error.message);
                    reject();                       
                }
            });
        });
    }

    function convertArrayToJson(array) {
        var json = [];
        for (var i = 0; i < array.length; i++) {
            json.push(array[i].toJSON());
        }
        return json;
    }
}