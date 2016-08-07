angular
    .module('RenderedField', [])
    .factory('RenderedField', RenderedField);

function RenderedField() {

    var RenderedField = function (field, edgePixelSize) {
        this.logicalField = field;
        this.center = this._getCenterCoordinates(field);
    };

    RenderedField.prototype._getCenterCoordinates = function (field) {
        return {
            x : field['column'] * 60 - 30,
            y : field['row'] * 60 - 30
        };
    };

    return RenderedField;
}