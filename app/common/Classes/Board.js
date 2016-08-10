angular
    .module('Board', [])
    .factory('Board', Board);

function Board(Field, Pin) {

    var Board = function () {
        this.fields = [];
        this.pins = [];
    };

    Board.prototype.init = function () {
        this.fields = this._generateFields();
        return this;
    };

    Board.prototype.initFromJSON = function () {
        // TODO:
    };

    /**
     * WHITES always starts from 1.
     * If you're WHITE!!!, your rendering engine will invert field order.
     */
    Board.prototype._generateFields = function () {
        var fields = [];

        for (var fieldNumber = 1; fieldNumber <= 64; fieldNumber++) {  // iterate to produce 64 squares
            var field = new Field(fieldNumber);
            this._addPinToFieldWhenNeeded(field);
            fields.push(field);
        }
        return fields;
    };

    Board.prototype._addPinToFieldWhenNeeded = function (field) {

        if(field.color === 'black') {
            // PLAYER 1 fields
            if (field.number >= 41) {
                this._addPinToField(field, 'black');
            }

            // PLAYER 2 fields
            if (field.number <= 24) {
                this._addPinToField(field, 'white');
            }
        }
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

    Board.prototype._addPinToField = function (field, color) {
        var pin = new Pin(color, this.pins.length);
        field.setPin(pin);
        this.pins.push(pin);
    };

    Board.prototype._fromJSON = function(json) {
        var obj = JSON.parse(json);
        return Object.assign(new Board(obj.number), obj);
    };

    return Board;
}