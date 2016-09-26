angular
    .module('GameMaster', [])
    .factory('GameMaster', GameMaster);

function GameMaster(Board, Pin, BoardMove, CheckersMove) {

    class GameMaster {
        constructor(board) {
            this.board = board;
            this.activePlayerColor = undefined;
        }

        isPlayerTurn(playerColor) {
            return playerColor === this.activePlayerColor;
        }

        pinBelongsToPlayer(pin, playerColor) {
            
            //console.log('pin.color', pin.color);
            //console.log('playerColor', playerColor);
            return pin.color === playerColor;
        }

        isPlayerAllowedToMove(playerColor, startField) {

            if (startField.hasPin()) {
                var pinBelongsToActivePlayer = this.pinBelongsToPlayer(startField.pin, playerColor);
                var isPlayerTurn = this.isPlayerTurn(playerColor);
                return pinBelongsToActivePlayer && isPlayerTurn;
            }
            else {
                return false;
            }
        }

        isMoveLegal(playerColor, startField, targetField) {
            
            var playerAllowedToMove = this.isPlayerAllowedToMove(playerColor, startField);
            //console.log('--------------------------------------------');
            //console.log('playerAllowedToMove', playerAllowedToMove);

            var boardMove = new BoardMove(playerColor, startField, targetField, this.board);
            return playerAllowedToMove && CheckersMove.isLegal(boardMove);
        }

        makeMove(playerColor, pin, targetField) {
            var startField = this.board.getFieldByPin(pin);


            //var move = new BoardMove(playerColor, startField, targetField, this.board);
            //CheckersMove.isLegal(boardMove)   debugger;

            if (this.isMoveLegal(playerColor, startField, targetField)) {
                this.board.movePinToField(pin, targetField);
                this.activePlayerColor = this.getNextPlayerColor(playerColor);
            }
        }

        setActivePlayerColor(playerColor) {
            this.activePlayerColor = playerColor;
        }

        getNextPlayerColor(playerColor) {
            return playerColor === 'black' ? 'white' : 'black';
        }
    }

    return GameMaster;
}
