angular
    .module('RenderedBoard', [])
    .factory('RenderedBoard', RenderedBoard);

function RenderedBoard(Board, RenderedField) {

    class RenderedBoard extends Board {
        constructor() {
            super();
            this.fields = this._getRenderedFields();
        }

        _getRenderedFields() {
            var renderedFields = [];
            var fields = this.fields;
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                renderedFields.push(new RenderedField(field));
            }
            return renderedFields;
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