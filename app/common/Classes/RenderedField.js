angular
    .module('RenderedField', [])
    .factory('RenderedField', RenderedField);

function RenderedField(Field) {

    class RenderedField extends Field {
        constructor(field, edgePixelSize) {
            super(field.number, field.rowNumber, field.columnNumber);
            this.pin = field.pin;
            this.center = this._getCenterCoordinates(this);
        }
        _getCenterCoordinates(field) {
            return {
                x : field.columnNumber * 60 - 30,
                y : field.rowNumber * 60 - 30
            };
        }
    }

    return RenderedField;
}