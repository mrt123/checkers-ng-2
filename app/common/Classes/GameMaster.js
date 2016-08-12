angular
    .module('GameMaster', [])
    .factory('GameMaster', GameMaster);

function GameMaster(Board, Pin, LegalMove) {

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

            var move = new LegalMove(playerColor, startField, targetField, this.board);
            var isOneSpaceLegalMove = move.isOneSpaceLegal();
            var isOneSpaceJumpMove = move.isOneSpaceJumpLegal();
            var moveIsLegal = isOneSpaceLegalMove || isOneSpaceJumpMove;
            
            console.log('--------------------------------------------');
            console.log('playerAllowedToMove', playerAllowedToMove);
            console.log('isOneSpaceLegalMove', isOneSpaceLegalMove);
            console.log('isOneSpaceJumpMove', isOneSpaceJumpMove);

            
            return playerAllowedToMove && moveIsLegal;
        }

        makeMove(playerColor, pin, targetField) {
            var startField = this.board.getFieldByPin(pin);


            //var move = new LegalMove(playerColor, startField, targetField, this.board);
            //debugger;

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
