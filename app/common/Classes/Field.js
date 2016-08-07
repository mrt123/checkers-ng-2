angular
    .module('Field', [])
    .factory('Field', Field);

function Field() {

    var Field = function (number, rowNumber, columnNumber) {
        this.number = number;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
        this.color = this.getColor(rowNumber, number);
        this.pin = undefined;
    };

    Field.prototype.hasPin = function () {
        return !this.isEmpty();
    };

    Field.prototype.isEmpty = function () {
        return this.pin === undefined;
    };

    Field.prototype.setPin = function (pin) {
        this.pin = pin;
    };

    Field.prototype.removePin = function () {
        this.pin = undefined;
    };

    Field.prototype.isColorWhite = function(rowNo, fieldNo) {
        var eveRow = rowNo % 2 == 0;
        var oddRow = !eveRow;
        var evenNumber = fieldNo % 2 == 0;
        var oddNumber = !evenNumber;
        return (oddRow && oddNumber ) || (eveRow && evenNumber);
    };
    
    Field.prototype.getColor = function(rowNo, fieldNo) {
        if(this.isColorWhite(rowNo, fieldNo)){
            return 'white';
        }
        else {
            return 'black';
        }
    };

    return Field;
}