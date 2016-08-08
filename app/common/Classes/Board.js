angular
    .module('Board', [])
    .factory('Board', Board)


function Board(Field, Pin) {

    var Board = function () {
        this.fields = this.generateFields();
        this.pins = [];
        this._insertPins();  
    };

    /**
     * WHITES always starts from 1.
     * If you're WHITE!!!, your rendering engine will invert field order.
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
        return this.fields.filter(function (field) {
            if(field.hasPin()) {
                return field.pin.id === pin.id;
            }
            else {
                return false;
            }
        })[0];
    };

    Board.prototype.isDiagonalField = function (baseField, targetField, playerColor) {
        var areFieldsInNeighbourColumns = this.areFieldsInNeighbourColumns(baseField, targetField);
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

    Board.prototype._insertPins = function () {
        
        var blackFields = this.getFieldsByColor('black');

        blackFields.forEach(function (field) {

            // PLAYER 1 fields
            if (field.number >= 41) {
                this._addPinToField(field, 'black', this.pins.length);
            }

            // PLAYER 2 fields
            if (field.number <= 24) {
                this._addPinToField(field, 'white', this.pins.length);
            }
            
        }.bind(this));
    };

    Board.prototype._addPinToField = function (field, color, id) {
        var pin = new Pin(color, id);
        field.setPin(pin);
        this.pins.push(pin);
    };

    Board.prototype.getFieldsByColor = function (color) {
        return this.fields.filter(function (field) {  
            return field.getColor() === color;
        });
    };

    return Board;
}