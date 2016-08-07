angular
    .module('Pin', [])
    .factory('Pin', Pin);

function Pin() {

    var Pin = function (color, id) {
        this.color = color;
        this.id = id;
    };

    Pin.prototype._determineColor = function() {
        return this.color;
    };

    return Pin;
}