angular
    .module('Board', [])
    .factory('Board', Board);

function Board(Field, Pin) {

    class Board {
        constructor() {
            this.fields = [];
            this.pins = [];
        }

        init() {
            this.fields = this._generateFields();
            return this;
        }

        initFromPlainFieldsObjects(objectsArray) {
            this.fields = this._generateFieldsFromObjects(objectsArray);
            return this;
        }

        /**
         * WHITES always starts from 1.
         * If you're WHITE!!!, your rendering engine will rotate board.
         * This way only 1 view of the board needs to be persisted, and GameMaster can make decisions,
         * based on field numbers and player color.
         */
        _generateFields() {
            var fields = [];

            for (var fieldNumber = 1; fieldNumber <= 64; fieldNumber++) {
                var field = new Field(fieldNumber);
                this._addPinToFieldWhenNeeded(field);
                fields.push(field);
            }
            return fields;
        }

        _generateFieldsFromObjects(objectsArray) {
            var fields = [];

            for (var i = 0; i < objectsArray.length; i++) {
                var json = objectsArray[i];
                var field = Field.fromPlainObject(json);
                fields.push(field);
            }
            return fields;
        }

        _addPinToFieldWhenNeeded(field) {

            if (field.color === 'black') {
                // PLAYER 1 fields
                if (field.number >= 41) {
                    this._addPinToField(field, 'black');
                }

                // PLAYER 2 fields
                if (field.number <= 24) {
                    this._addPinToField(field, 'white');
                }
            }
        }

        movePinToField(pin, targetField) {
            var baseField = this.getFieldByPin(pin);
            baseField.removePin();
            targetField.setPin(pin);
            return targetField;
        }

        getFieldByPin(pin) {
            return this.fields.filter(function (field) {
                if (field.hasPin()) {
                    return field.pin.id === pin.id;
                }
                else {
                    return false;
                }
            })[0];
        }

        isDiagonalField(baseField, targetField, playerColor) {
            var areFieldsInNeighbourColumns = this.areFieldsInNeighbourColumns(baseField, targetField, playerColor);
            var isTargetForward = this.isForwardField(baseField, targetField, playerColor);
            return areFieldsInNeighbourColumns && isTargetForward;
        }

        areFieldsInNeighbourColumns(field1, field2) {
            var columnDiff = Math.abs(field1.columnNumber - field2.columnNumber);
            return columnDiff === 1;
        }

        isForwardField(baseField, targetField, playerColor) {
            var diffToNewRow = targetField.rowNumber - baseField.rowNumber;

            if (playerColor === 'white') {
                return diffToNewRow === 1;
            }
            else {
                return diffToNewRow === -1;
            }
        }

        _addPinToField(field, color) {
            var pin = new Pin(color, this.pins.length);
            field.setPin(pin);
            this.pins.push(pin);
        }

        toPlainObject() {
            var plainFieldObjects = [];

            for (var i = 0; i < this.fields.length; i++) {
                var nativeField = this.fields[i];
                plainFieldObjects.push(nativeField.toPlainObject());
            }

            return {
                fields: plainFieldObjects
            }
        }
        
        getFieldAtPosition(rowNumber, columnNumber) {
            return this.fields.filter(function(field) {
                return this._isFieldAtPosition(field, rowNumber, columnNumber);
            }, this)[0];
        }
        
        _isFieldAtPosition(field, rowNumber, columnNumber) {
            return (field.rowNumber === rowNumber) && (field.columnNumber === columnNumber)
        }
    }

    return Board;
}
