angular
    .module('Field', [])
    .factory('Field', Field);

function Field() {

    var Field = function (number, rowNumber, columnNumber) {
        this.number = number;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
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

    return Field;
}