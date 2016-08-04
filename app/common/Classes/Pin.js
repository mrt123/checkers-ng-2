angular.module('Pin', []).factory('Pin',
    function () {

        var Pin = function (color, id) {
            this.color = color;
            this.id = id;
        };

        Pin.prototype.getColor = function() {
            return this.color;
        };

        return Pin;
    });