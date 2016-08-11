angular
    .module('BoardMove', [])
    .factory('BoardMove', BoardMove);

function BoardMove() {

    // TODO: player color could be replaced with moveDirection(1st Row, last Row) 

    class BoardMove {
        constructor(playerColor, startField, endField) {
            this.playerColor = playerColor;
            this.startRow = startField.rowNumber;
            this.startColumn = startField.columnNumber;
            this.endRow = endField.rowNumber;
            this.endColumn = endField.columnNumber;
        }

        getColumnDiff() {
            return this.startColumn - this.endColumn;
        }

        getRowDiff() {
            return this.startRow - this.endRow;
        }

        isDiagonal() {
            var rowToColumnRatio = this.getRowDiff() / this.getColumnDiff;
            return rowToColumnRatio === 1;
        }

        isNRowForward(n) {
            var rowDiff = this.getRowDiff();

            if (playerColor === 'white') {
                return rowDiff === -n;
            }
            else {
                return rowDiff > n;
            }
        }

        is1RowForwardDiagonal() {  // might be better suited for LegalMove
            return isNRowForward(1) && this.isDiagonal();
        }

        // TODO: whiteboard all legal moves, and derive LegalMove { move : new BoardMove() } 
    }

    return BoardMove;
}
