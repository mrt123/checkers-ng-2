angular
    .module('Pin', [])
    .factory('Pin', Pin);

function Pin() {

    class Pin {
        constructor(color, id) {
            this.color = color;
            this.id = id;
        }
    }

    return Pin;
}
