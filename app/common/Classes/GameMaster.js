angular
    .module('GameMaster', [])
    .factory('GameMaster', GameMaster);

function GameMaster(Board, Pin) {

    class GameMaster {
        constructor(board) {
            this.board = board;
            this.activePlayerColor = undefined;
        }

        isPlayerTurn(playerColor) {
            return playerColor === this.activePlayerColor;
        }

        pinBelongsToPlayer(pin, playerColor) {
            return pin.color === playerColor;
        }

        isMoveLegal(playerColor, startField, targetField) {

            if (startField.hasPin()) {
                var pinBelongsToActivePlayer = this.pinBelongsToPlayer(startField.pin, playerColor);
                var isPlayerTurn = this.isPlayerTurn(playerColor);
                var isForwardMove = this.board.isForwardField(startField, targetField, playerColor);
                var isDiagonalMove = this.board.isDiagonalField(startField, targetField, playerColor);

                return pinBelongsToActivePlayer && isPlayerTurn && isForwardMove && isDiagonalMove
                    && targetField.isEmpty();
            }

            else {
                return false;
            }
        }
        
        //getRowCountToTargetField(startField, targetField) {
        //    var startRow = startField.rowNumber;
        //    var targetRow = targetField.rowNumber;
        //    
        //    if(this.activePlayerColor ==='black') {
        //        return startRow - targetRow;
        //    }
        //    else {
        //        return targetRow - startRow;
        //    }
        //}
        //
        //getColumnDiff(startField, targetField) {
        //    return startField.columnNumber - targetField.columnNumber; 
        //}
        //
        //is1stepForwardMove(startField, targetField) {
        //    
        //    // TODO: include player check 
        //    return getRowCountToTargetField(startField, targetField) === 1;
        //}
        //
        //isDiagonalMove(startField, targetField) {
        //    
        //}
        //
        //is1stepDiagonalMove(startField, targetField) {
        //    
        //}

        makeMove(playerColor, pin, targetField) {
            var baseField = this.board.getFieldByPin(pin);
            if (this.isMoveLegal(playerColor, baseField, targetField)) {
                this.board.movePinToField(pin, targetField);
                this.activePlayerColor = this.getNextPlayerColor(playerColor);
            }
        }

        setActivePlayerColor(playerColor) {
            console.log(111, playerColor)
            this.activePlayerColor = playerColor;
        }

        getNextPlayerColor(playerColor) {
            return playerColor === 'black' ? 'white' : 'black';
        }
    }

    return GameMaster;
}
