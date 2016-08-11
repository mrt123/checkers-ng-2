angular
    .module('Player', [])
    .factory('Player', Player);

function Player() {

    class Player {
        constructor(email, color) {
            this.email = email;
            this.color = color;
        }
    }

    return Player;
}
