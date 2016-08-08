angular
    .module('Field', [])
    .factory('Field', Field);

function Field() {
    class Field {
        constructor(number, rowNumber, columnNumber) {
            this.number = number;
            this.rowNumber = rowNumber;
            this.columnNumber = columnNumber;
            this.color = this._determineColor(rowNumber, number);
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

        _determineColor(rowNo, fieldNo) {
            if (this._isColorWhite(rowNo, fieldNo)) {
                return 'white';
            }
            else {
                return 'black';
            }
        }
    }
    return Field;
}