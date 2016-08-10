angular
    .module('RenderedBoard', [])
    .factory('RenderedBoard', RenderedBoard);

function RenderedBoard(Board, RenderedField) {

    class RenderedBoard extends Board {
        constructor() {
            super();
        }

        init() {
            this.fields = this.generateFields();
            this.fields = this._getRenderedFields();
            this._insertPins();  // should be compatible with RenderedFields
            return this;
        }

        _getRenderedFields() { // TODO: this has near identical impl with Field
            var fields = [];

            for (var fieldNumber = 1; fieldNumber <= 64; fieldNumber++) {
                fields.push(new RenderedField(fieldNumber));
            }
            return fields;
        }

        getRenderedFieldAtXY(x, y) {
            var snapThreshold = 25;

            for (var i = 0; i < this.fields.length; i++) {
                var field = this.fields[i];
                if (
                    this._isNumberWithin(field.center.x, x, snapThreshold) &&
                    this._isNumberWithin(field.center.y, y, snapThreshold)
                ) {
                    return field;
                }
            }
            return null;
        }

        _isNumberWithin(number, target, threshold) {
            return Math.abs(number - target) < threshold;
        }
    }

    return RenderedBoard;
}