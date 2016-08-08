angular
    .module('GameMaster', [])
    .factory('GameMaster', GameMaster);

function GameMaster(Board, Pin) {

    var GameMaster = function () {
        this.board = new Board();
        this.nextPlayerColor = undefined;
    };

    GameMaster.prototype.isPlayerTurn = function (playerColor) {
        return playerColor === this.nextPlayerColor;
    };

    GameMaster.prototype.isPinBelongsToPlayer = function (pin, playerColor) {
        return pin.color === playerColor;
    };

    GameMaster.prototype.isMoveLegal = function (playerColor, baseField, targetField) {

        if (baseField.hasPin()) {
            var pinBelongsToPlayer = this.isPinBelongsToPlayer(baseField.pin, playerColor);
            var isPlayerTurn = this.isPlayerTurn(playerColor);
            var isForwardMove = this.board.isForwardField(baseField, targetField);
            var isDiagonalDiagonalMove = this.board.isDiagonalField(baseField, targetField);

            return pinBelongsToPlayer && isPlayerTurn && isForwardMove && isDiagonalDiagonalMove
                && targetField.isEmpty();
        }

        else {
            return false;
        }
    };

    GameMaster.prototype.makeMove = function (playerColor, pin, targetField) {
        var baseField = this.board.getFieldByPin(pin);
        if (this.isMoveLegal(playerColor, baseField, targetField)) {
            this.board.movePinToField(pin, targetField);
            this.nextPlayerColor = 'not you';
        }
    };

    GameMaster.prototype.startGame = function (opts) {
        this.nextPlayerColor = opts.firstPlayerColor;
    };


    return GameMaster;
}