angular
    .module('Board', [])
    .factory('Board', Board)


function Board(Field) {

    var Board = function (gameMaster, board, number) {
        this.fields = this.generateFields();
    };

    /**
     * Whites always starts from 1.
     * If you're white!!!, your presentation will invert field order.
     */
    Board.prototype.generateFields = function () {
        var fields = [];

        for (var fieldNumber = 1; fieldNumber <= 64; fieldNumber++) {  // iterate to produce 64 squares
            var rowNumber = Math.ceil(fieldNumber / 8);
            var columnNumber = fieldNumber - ( (rowNumber - 1) * 8);
            fields.push(new Field(fieldNumber, rowNumber, columnNumber));
        }
        return fields;
    };

    Board.prototype.movePinToField = function (pin, targetField) {
        var baseField = this.getFieldByPin(pin);
        baseField.removePin();
        targetField.setPin(pin);
        return targetField;
    };

    Board.prototype.getFieldByPin = function (pin) {
        return this.fields.filter(function(field) {
            return field.pin === pin;
        })[0];
    };

    Board.prototype.isDiagonalField = function (baseField, targetField, playerColor) {
        var areFieldsInNeighbourColumns = this.areFieldsInNeighbourColumns();
        var isTargetForward = this.isForwardField(baseField, targetField, playerColor);
        return areFieldsInNeighbourColumns && isTargetForward;
    };

    Board.prototype.areFieldsInNeighbourColumns = function (field1, field2) {
        var columnDiff = Math.abs(field1.columnNumber - field2.columnNumber);
        return columnDiff === 1;
    };

    Board.prototype.isForwardField = function (baseField, targetField, playerColor) {
        var diffToNewRow = targetField.rowNumber - baseField.rowNumber;

        if (playerColor === 'white') {
            return diffToNewRow === 1;
        }
        else {
            return diffToNewRow === -1;
        }
    };

    return Board;
}