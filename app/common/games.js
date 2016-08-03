angular
    .module('games', [])
    .factory('games', games);

function games($q, account) {
    var self = {
        getAll: getAll,
        create: create,
        created: [],
        invitedTo: [],
        updateEvent: $q.defer()
    };

    activate();
    return self;

    function activate() {
        self.getAll();
    }

    function getAll() {
        return $q(function (resolve, reject) {
            var allMyGamesQuery = constructGetAlQuery();
            allMyGamesQuery.find({
                success: function (results) {
                    console.log("GET games: " + results.length);
                    var json = convertArrayToJson(results);
                    setInvitedFromAll(json);
                    setCreatedFromAll(json);
                    self.updateEvent.notify();
                    resolve(json);
                },
                error: function (error) {
                    console.log("Error: " + error.message);
                    self.updateEvent.notify();
                    reject(error);
                }
            });
        });
    }

    function getCreatedFromAll(allGames) {
        return allGames.filter(function (game) {
            return game.p1Email === Parse.User.current().get('username');
        });
    }

    function setCreatedFromAll(allGames) {
        self.created = getCreatedFromAll(allGames);
    }

    function getInvitationsFromAll(formattedResults) {
        return formattedResults.filter(function (game) {
            return game.p2Email === Parse.User.current().get('username');
        });
    }

    function setInvitedFromAll(formattedResults) {
        self.invitedTo = getInvitationsFromAll(formattedResults);
    }

    // TODO: optimize into single compound query with get All
    function constructGetAlQuery() {
        var Game = Parse.Object.extend("Game");

        var gamesICreatedQuery = new Parse.Query(Game);
        gamesICreatedQuery.equalTo("p1Email", Parse.User.current().get('username'));

        var gamesImInvitedToQuery = new Parse.Query(Game);
        gamesImInvitedToQuery.equalTo("p2Email", Parse.User.current().get('username'));

        var mainQuery = Parse.Query.or(gamesICreatedQuery, gamesImInvitedToQuery);
        return mainQuery;
    }

    function getUserIdFromEmail(email) {
        return $q(function (resolve, reject) {
            var user = Parse.Object.extend("_User");
            var query = new Parse.Query(user);
            query.equalTo('username', email);
            query.find({
                success: function (results) {
                    if (results.length > 0) {
                        resolve(results[0].id)
                    }
                    else {
                        reject('no users found for email: ' + email);
                    }
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    function create(rawObject) {   // TODO : use userID in compound query to create Game
        return $q(function (resolve, reject) {
            getUserIdFromEmail(rawObject.p2Email)
                .then(
                function (userId) {
                    _saveGame(rawObject, userId);
                },
                function (error) {
                    throw error;  // TODO: propagate to controller
                })
                .then(resolve, reject);
        });
    }

    function _saveGame(rawObject, opponentUserId) {
        var Game = Parse.Object.extend("Game");
        var game = new Game();

        var acl = new Parse.ACL(Parse.User.current());
        acl.setReadAccess(opponentUserId, true);
        acl.setWriteAccess(opponentUserId, true);
        game.setACL(acl);

        return $q(function (resolve, reject) {
            game.save(rawObject, {
                success: function (game) {
                    console.log("POST game :" + game.id);
                    var json = game.toJSON();
                    self.created.push(json);
                    self.updateEvent.notify();
                    resolve(game.toJSON());
                },
                error: function (game, error) {
                    console.log("Error: " + error.message);
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