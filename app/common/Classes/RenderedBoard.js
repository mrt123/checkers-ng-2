angular
    .module('RenderedBoard', [])
    .factory('RenderedBoard', RenderedBoard);

function RenderedBoard(RenderedField) {

    var RenderedBoard = function (logicalBoard) {
        this.logicalBoard = logicalBoard;
        this.renderedFields = this._getRenderedFields(logicalBoard.fields);
    };


    RenderedBoard.prototype._getRenderedFields = function (logicalFields) {
        var renderedFields = [];
        for (var i = 0; i < logicalFields.length; i++) {
            var logicalField = logicalFields[i];
            renderedFields.push(new RenderedField(logicalField));
        }
        return renderedFields;
    };

    RenderedBoard.prototype.getFieldAtXY = function (x, y) {
        var snapThreshold = 25;

        for (var i = 0; i < this.renderedFields.length; i++) {
            var field = this.logicalBoard.fields[i];
            if (
                this._isNumberWithin(field.center.x, x, snapThreshold) &&
                this._isNumberWithin(field.center.y, y, snapThreshold)
            ) {
                return field;
            }
        }
        return null;
    };

    RenderedBoard.prototype._isNumberWithin = function (number, target, threshold) {
        return Math.abs(number - target) < threshold;
    };

    return RenderedBoard;
}