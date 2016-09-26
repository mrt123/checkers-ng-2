angular
    .module('CheckersMove', [])
    .factory('CheckersMove', CheckersMove);

function CheckersMove() {

    class CheckersMove {   
        
        static _isOneSpaceLegal(boardMove) { 
            return boardMove.isNRowForward(1) && boardMove.isDiagonal() && boardMove.isTargetFieldEmpty();
        }

        static _isOneSpaceJumpLegal(boardMove) { 
            // TODO: check if fields between belong to opponent
            
            return boardMove.isNRowForward(2) 
                && boardMove.isDiagonal() && boardMove.isTargetFieldEmpty() 
                && boardMove.getFieldsBetween().length > 0;
        }

        static _isKingJumpLegal(boardMove) { 
            return this.isDiagonal();   // && pin is a king
        }
        
        static isLegal(boardMove) {
            var isOneSpaceLegalMove = CheckersMove._isOneSpaceLegal(boardMove);
            var isOneSpaceJumpMove = CheckersMove._isOneSpaceJumpLegal(boardMove);
            //console.log('isOneSpaceLegalMove', isOneSpaceLegalMove);
            //console.log('isOneSpaceJumpMove', isOneSpaceJumpMove);
            return isOneSpaceLegalMove || isOneSpaceJumpMove;
        }

    }

    return CheckersMove;
}
