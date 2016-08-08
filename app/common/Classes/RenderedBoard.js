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

    RenderedBoard.prototype.getRenderedFieldAtXY = function (x, y) {
        var snapThreshold = 25;

        for (var i = 0; i < this.renderedFields.length; i++) {
            var renderedField = this.renderedFields[i];
            if (
                this._isNumberWithin(renderedField.center.x, x, snapThreshold) &&
                this._isNumberWithin(renderedField.center.y, y, snapThreshold)
            ) {
                return renderedField;
            }
        }
        return null;
    };

    RenderedBoard.prototype._isNumberWithin = function (number, target, threshold) {
        return Math.abs(number - target) < threshold;
    };

    return RenderedBoard;
}