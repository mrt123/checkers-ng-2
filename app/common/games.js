angular
    .module('games', [])
    .factory('games', games);

function games($q, account) {
    var self = {
        getAll: getAll,
        create: create,
        saveCurrentGameAttributes: saveCurrentGameAttributes,
        get: get,
        _Game: Parse.Object.extend("Game"),
        _currentGame: undefined,
        created: [],
        invitedTo: [],
        updateEvent: $q.defer()
    };

    activate();
    return self;

    function activate() {
    }

    function getAll() {
        return $q(function (resolve, reject) {
            var allMyGamesQuery = constructGetAlQuery();
            allMyGamesQuery.find({
                success: function (results) {
                    console.log("GET games: ", results.length);
                    var allGamesJSON = convertArrayToJson(results);
                    setInvitedGames(allGamesJSON);
                    setCreatedGames(allGamesJSON);
                    self.updateEvent.notify();
                    resolve(allGamesJSON);
                },
                error: function (error) {
                    console.log("Error: " + error.message);
                    self.updateEvent.notify();
                    reject(error);
                }
            });
        });
    }
    
    function get(id) {
        var gameQuery = new Parse.Query(self._Game);
        gameQuery.equalTo("objectId", id);
        
        var deferred = $q.defer();
        
        gameQuery.first({
            success: function (result) {
                self._currentGame = result;
                deferred.notify(result.toJSON());
            },
            error: function (error) {
                console.log("Error: " + error.message);
                deferred.reject(error);
            }
        });


        subscribeToQuery(gameQuery, deferred);
        
        return deferred.promise;
    }
    
    function subscribeToQuery(query, deferred) {
        
        var subscription = query.subscribe();
        subscription.on('update', (object) => {
            console.log('remote update received', object.toJSON());
            deferred.notify(object.toJSON());
        });
    }

    function create(rawObject) {   // TODO : use userID in compound query to create Game
        return $q(function (resolve, reject) {
            getUserIdFromEmail(rawObject.p2Email)
                .then(
                function (userId) {
                    _saveRawObjectAsGame(rawObject, userId);
                },
                function (error) {
                    throw error;  // TODO: propagate to controller
                })
                .then(resolve, reject);
        });
    }

    function getCreatedFromAll(allGames) {
        return allGames.filter(function (game) {
            return game.p1Email === Parse.User.current().get('username');
        });
    }

    function setCreatedGames(allGames) {
        self.created = getCreatedFromAll(allGames);
    }

    function getInvitationsFromAll(formattedResults) {
        return formattedResults.filter(function (game) {
            return game.p2Email === Parse.User.current().get('username');
        });
    }

    function setInvitedGames(formattedResults) {
        self.invitedTo = getInvitationsFromAll(formattedResults);
    }

    // TODO: optimize into single compound query with get All
    function constructGetAlQuery() {
        var Game = Parse.Object.extend("Game");

        var gamesCreatedByMeQuery = new Parse.Query(Game);
        gamesCreatedByMeQuery.equalTo("p1Email", account.user.email);

        var gamesImInvitedToQuery = new Parse.Query(Game);
        gamesImInvitedToQuery.equalTo("p2Email", account.user.email);

        var mainQuery = Parse.Query.or(gamesCreatedByMeQuery, gamesImInvitedToQuery);
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

    function saveCurrentGameAttributes(attributes) {

        return $q(function (resolve, reject) {

            self._currentGame.save(attributes, {
                success: function (vendorGame) {
                    console.log("POST game :" + vendorGame.id);
                    self._currentGame(vendorGame);

                    self.updateEvent.notify();
                    resolve();
                },
                error: function (game, error) {
                    console.log('failed game save', gameData);
                    console.log("Error", error);
                    reject();
                }
            });
        });
    }

    function _saveRawObjectAsGame(rawObject, opponentUserId) {
        var Game = Parse.Object.extend("Game");
        var game = new Game();

        // TODO: bring back ACL , when subscribe is figured out
        //var acl = new Parse.ACL(Parse.User.current());
        //acl.setReadAccess(opponentUserId, true);
        //acl.setWriteAccess(opponentUserId, true);
        //game.setACL(acl);

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