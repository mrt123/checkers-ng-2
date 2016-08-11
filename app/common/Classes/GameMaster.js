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

        isPinBelongsToPlayer(pin, playerColor) {
            return pin.color === playerColor;
        }

        isMoveLegal(startField, targetField) {
            
            if (startField.hasPin()) {
                var pinBelongsToPlayer = this.isPinBelongsToPlayer(startField.pin, this.playerColor);
                var isPlayerTurn = this.isPlayerTurn(this.playerColor);
                var isForwardMove = this.board.isForwardField(startField, targetField, this.activePlayerColor);
                var isDiagonalDiagonalMove = this.board.isDiagonalField(startField, targetField);
                
                //console.log('pinBelongsToPlayer', pinBelongsToPlayer);
                //console.log('isPlayerTurn', isPlayerTurn);

                
                if(targetField.isEmpty()) {
                    //console.log('targetField.isEmpty()', targetField.isEmpty());
                    console.log('isForwardMove',isForwardMove );
                    console.log('isDiagonalDiagonalMove', isDiagonalDiagonalMove);
                }
                
                return pinBelongsToPlayer && isPlayerTurn && isForwardMove && isDiagonalDiagonalMove
                    && targetField.isEmpty();
            }

            else {
                return false;
            }
        }

        makeMove(playerColor, pin, targetField) {
            var baseField = this.board.getFieldByPin(pin);
            if (this.isMoveLegal(baseField, targetField)) {
                this.board.movePinToField(pin, targetField);
                this.activePlayerColor = this.getNextPlayerColor(playerColor);
            }
        }

        setActivePlayerColor(playerColor) { console.log(111, playerColor)
            this.activePlayerColor = playerColor;
        }

        getNextPlayerColor(playerColor) {
            return playerColor  === 'black' ? 'white' : 'black';
        }
    }
    
    return GameMaster;
}
