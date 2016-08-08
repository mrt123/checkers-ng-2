angular
    .module('RenderedField', [])
    .factory('RenderedField', RenderedField);

function RenderedField(Field) {

    var RenderedField = function (field, edgePixelSize) {
        this.logicalField = field;
        this.center = this._getCenterCoordinates(field);
    };

    RenderedField.prototype._getCenterCoordinates = function (field) {
        
        return {
            x : field.columnNumber * 60 - 30,
            y : field.rowNumber * 60 - 30
        };
    };

    return RenderedField;
}


function zzz() {

    // TODO: replace class with below ES6 syntax
    
    class RenderedField extends Field {
        constructor(field, edgePixelSize) {
            super();
            this.center = this._getCenterCoordinates(field);
        }
        _getCenterCoordinates() {
            return {
                x : field.columnNumber * 60 - 30,
                y : field.rowNumber * 60 - 30
            };
        }
    }
}