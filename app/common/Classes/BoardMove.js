angular
    .module('BoardMove', [])
    .factory('BoardMove', BoardMove);

function BoardMove() {

    // TODO: player color could be replaced with moveDirection(1st Row, last Row) 

    class BoardMove {
        constructor(playerColor, startField, targetField, board) {
            this.playerColor = playerColor;   // TODO: consider taking player as function argument
            this.startField = startField;
            this.targetField = targetField;
            this.board = board;
        }

        getColumnDiff() {
            return this.startField.columnNumber - this.targetField.columnNumber;
        }

        getRowDiff() {
            return this.startField.rowNumber - this.targetField.rowNumber;
        }

        isDiagonal() {
            return Math.abs(this.getRowDiff()) === Math.abs(this.getColumnDiff());
        }

        isNRowForward(n) {
            var rowDiff = this.getRowDiff();

            if (this.playerColor === 'white') {
                return rowDiff === -n;
            }
            else {
                return rowDiff === n;
            }
        }

        isTargetFieldEmpty() {
            return this.targetField.isEmpty();
        }

        getFieldsBetween() {
            var fields = [];
            var rowDiff = this.getRowDiff();
            var nTimes = rowDiff - 1;

            for (var i = 1; i <= nTimes; i++) {
                var rowNumber = this.startField.rowNumber + i;
                var columnNumber = this.startField.columnNumber + i;
                var field = this.board.getFieldAtPosition(rowNumber, columnNumber);
                fields.push(field);
            }
            
            return fields;
        }
    }

    return BoardMove;
}
