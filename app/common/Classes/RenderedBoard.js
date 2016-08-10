angular
    .module('RenderedBoard', [])
    .factory('RenderedBoard', RenderedBoard);

function RenderedBoard(Board, RenderedField) {

    class RenderedBoard extends Board {
        constructor() {
            super();
        }

        _generateFields() {
            var fields = [];

            for (var fieldNumber = 1; fieldNumber <= 64; fieldNumber++) {
                var field = new RenderedField(fieldNumber);
                this._addPinToFieldWhenNeeded(field);
                fields.push(field);
            }
            return fields;
        }

        _generateFieldsFromObjects(objectsArray) {
            var fields = [];

            for (var i = 0; i < objectsArray.length; i++) {
                var json = objectsArray[i];
                var field = RenderedField._fromObject(json);
                fields.push(field);
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