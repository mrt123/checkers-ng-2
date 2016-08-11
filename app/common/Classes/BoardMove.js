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
        
        isForwardMove() {
            
        }

        is1stepForwardDiagonalMove() {
            // is rowDiff == 1  or -1    for white/black
            //  and is 1 columnDiff = 1


            return null;
        }

    }

    return BoardMove;
}
