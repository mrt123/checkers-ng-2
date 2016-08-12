angular
    .module('LegalMove', [])
    .factory('LegalMove', LegalMove);

function LegalMove(BoardMove) {

    class LegalMove extends BoardMove {    // TODO: CONSIDER CheckersMove .. to be a static Class
        constructor(playerColor, startField, endField, board) {
            super(playerColor, startField, endField, board);
        }



        isOneSpaceLegal() { 
            return this.isNRowForward(1) && this.isDiagonal() && this.isTargetFieldEmpty();
        }

        isOneSpaceJumpLegal() { 
            // TODO: check if fields between belong to opponent
            
            return this.isNRowForward(2) 
                && this.isDiagonal() && this.isTargetFieldEmpty() 
                && this.getFieldsBetween(this.startField, this.targetField).length > 0;
        }

        isKingLegal() { 
            return this.isDiagonal();   // && player is a king
        }

    }

    return LegalMove;
}
