angular
    .module('Field', [])
    .factory('Field', Field);

function Field() {
    class Field {
        constructor(number) {
            this.number = number;
            this.rowNumber = this._getRowNumber(number);
            this.columnNumber = this._getColumnNumber(number);
            this.color = this._determineColor(number);
            this.pin = undefined;
        }

        hasPin() {
            return !this.isEmpty();
        }

        isEmpty() {
            return this.pin === undefined;
        }

        setPin(pin) {
            this.pin = pin;
        }

        removePin() {
            this.pin = undefined;
        }

        getColor() {
            return this.color;
        }

        _isColorWhite(rowNo, fieldNo) {
            var eveRow = rowNo % 2 == 0;
            var oddRow = !eveRow;
            var evenNumber = fieldNo % 2 == 0;
            var oddNumber = !evenNumber;
            return (oddRow && oddNumber ) || (eveRow && evenNumber);
        }

        _determineColor(fieldNo) {
            if (this._isColorWhite(this.rowNumber, fieldNo)) {
                return 'white';
            }
            else {
                return 'black';
            }
        }

        _getRowNumber(fieldNumber) {
            return Math.ceil(fieldNumber / 8);
        }

        _getColumnNumber(fieldNumber) {
            var rowNumber = this._getRowNumber(fieldNumber);
            return fieldNumber - ( (rowNumber - 1) * 8);
        }

        static _fromJSON(json) {
            var obj = JSON.parse(json);
            return Object.assign(new Field(obj.number), obj);
        }
    }
    return Field;
}