angular
    .module('ch-board', [])
    .directive('chBoard', ChBoard);

function ChBoard() {
    return {
        bindToController: true,
        controller: ChBoardCtrl,
        controllerAs: 'vm',
        link: link,
        restrict: 'E',
        scope: {
            gameMaster: '=',
            board: '=',
            playerColor: '='
        },
        templateUrl: 'common/ch-board/ch-board.html'
    };
}

function link($scope, element, attrs) {

}

function ChBoardCtrl(RenderedField) {

    this.fields = this.board.fields;
    this.pins = _getScopePins(this.board.fields);  
    this.onPinHover = onPinHover;
    this.onPinDrop = onPinDrop;
    this.activeSquare = undefined;

    function _getScopePins(fields) {
        var scopePins = [];  

        for (var i = 0; i < fields.length; i++) { 
            var field = fields[i];
            var pinData = field.pin;

            if(pinData) {
                var scopePin = _getScopePin(pinData, field);
                scopePins.push(scopePin);
            }
        }
        return scopePins;
    }

    function onPinHover(destinationX, destinationY, pin) {
        _removeHighlight(this, this.activeSquare);

        var originField = this.board.getFieldByPin(pin);
        var targetRenderedField = this.board.getRenderedFieldAtXY(destinationX, destinationY);
        
        if (targetRenderedField !== null) {
            var moveIsLegal = this.gameMaster.isMoveLegal(this.playerColor, originField, targetRenderedField);

            if (moveIsLegal) {
                this.activeSquare = this.fields[targetRenderedField.number - 1];
                this.activeSquare.actions.highlight(); 
            }
        }
    }

    function onPinDrop (destinationX, destinationY, pin) {

        var originField = this.board.getFieldByPin(pin);
        var targetField = this.board.getRenderedFieldAtXY(destinationX, destinationY);

        if (targetField !== null) {
            if (this.gameMaster.isMoveLegal(this.playerColor, originField, targetField)) {
                _dropPinOnField(pin, targetField);
                this.board.movePinToField(originField.pin, targetField)
            }
            else {
                animatePinToField(pin, originField);
            }
        }
        else {
            animatePinToField(pin, originField);
        }
        _removeHighlight(this, this.activeSquare);
    }
    
    function _dropPinOnField(pin, field) {
        var x = field.center.x - 30;
        var y = field.center.y - 30;
        pin.api.leaveAt(x, y);
    }

    function _getScopePin(pin, bitmapField) {
        return {
            color: pin.color,
            id: pin.id,
            top: bitmapField.center.y,
            left: bitmapField.center.x
        }
    }

    function _removeHighlight(scope, square) {
        if (square  !== undefined) {
            square.actions.removeHighlight(); // bound to directive!  
            scope.activeSquare = undefined;  // prevent repeat deHighlight if no new highlight been made!
        }
    }

    function animatePinToField(pin, field) {
        var x = field.center.x - 30;
        var y = field.center.y - 30;
        pin.api.animateTo(x, y);
    }
}

