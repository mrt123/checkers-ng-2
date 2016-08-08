angular
    .module('Pin', [])
    .factory('Pin', Pin);

function Pin() {

    var Pin = function (color, id) {
        this.color = color;
        this.id = id;
    };

    return Pin;
}