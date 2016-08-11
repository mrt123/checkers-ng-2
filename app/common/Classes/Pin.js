angular
    .module('Pin', [])
    .factory('Pin', Pin);

function Pin() {

    class Pin {
        constructor(color, id) {
            this.color = color;
            this.id = id;
        }

        static fromPlainObject(obj) {
            return Object.assign(new this(obj.color, obj.id), obj)
        }

        toPlainObject() {
            return {
                color: this.color,
                id: this.id
            }
        }
    }

    return Pin;
}
