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

        isMoveLegal(playerColor, startField, targetField) {
            if (startField.hasPin()) {
                var pinBelongsToPlayer = this.isPinBelongsToPlayer(startField.pin, playerColor);
                var isPlayerTurn = this.isPlayerTurn(playerColor);
                var isForwardMove = this.board.isForwardField(startField, targetField);
                var isDiagonalDiagonalMove = this.board.isDiagonalField(startField, targetField);

                return pinBelongsToPlayer && isPlayerTurn && isForwardMove && isDiagonalDiagonalMove
                    && targetField.isEmpty();
            }

            else {
                return false;
            }
        }

        makeMove(playerColor, pin, targetField) {
            var baseField = this.board.getFieldByPin(pin);
            if (this.isMoveLegal(playerColor, baseField, targetField)) {
                this.board.movePinToField(pin, targetField);
                this.activePlayerColor = this.getNextPlayerColor(playerColor);
            }
        }

        setActivePlayerColor(playerColor) {
            this.activePlayerColor = playerColor;
        }

        static getNextPlayerColor(playerColor) {
            return 'black' ? 'white' : 'black';
        }
    }
    
    return GameMaster;
}
