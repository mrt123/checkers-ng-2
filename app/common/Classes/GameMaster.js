angular
    .module('GameMaster', [])
    .factory('GameMaster', GameMaster);

function GameMaster(Board, Pin) {

    var GameMaster = function () {
        this.board = new Board();
        this.nextPlayerColor = undefined;
    };

    GameMaster.prototype.isPlayerTurn = function(playerColor) {
        return playerColor === this.nextPlayerColor;
    };

    GameMaster.prototype.isPinBelongsToPlayer = function(pin, playerColor) {
        return pin.color === playerColor;
    };

    GameMaster.prototype.isMoveLegal = function(playerColor, baseField, targetField) {
        var fieldHasPin = baseField.hasPin();
        var isPlayerTurn = this.isPlayerTurn(playerColor);
        var pinBelongsToPlayer = this.isPinBelongsToPlayer(playerColor);
        var isForwardMove = this.board.isForwardField(baseField, targetField);
        var isDiagonalDiagonalMove = this.board.isDiagonalField(baseField, targetField);
        
        return fieldHasPin && isPlayerTurn && pinBelongsToPlayer && isForwardMove && isDiagonalDiagonalMove;
    };

    GameMaster.prototype.makeMove = function(playerColor, pin, targetField) {
        var baseField = this.board.getFieldByPin(pin);
        if(this.isMoveLegal(playerColor, baseField, targetField)) {
            this.movePinToField(pin, targetField);
        }
    };


    
    
    return GameMaster;
}