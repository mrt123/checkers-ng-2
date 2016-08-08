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
            renderedBoard: '=',
            playerColor: '='
        },
        templateUrl: 'common/ch-board/ch-board.html'
    };
}

function link($scope, element, attrs) {

}

function ChBoardCtrl() {

    this.renderedFields = this.renderedBoard.renderedFields;
    this.pins = _getScopePins(this.renderedBoard);
    this.pinHovers = onPinHover;
    this.activeSquare = undefined;

    function _getScopePins(renderedBoard) {
        var scopePins = [];

        var renderedFields = renderedBoard.renderedFields;

        for (var i = 0; i < renderedFields.length; i++) {

            var renderedField = renderedFields[i];
            var pinData = renderedField.logicalField.pin;

            if(pinData) {
                var scopePin = _generatePin(pinData, renderedField);
                scopePins.push(scopePin);
            }
        }
        return scopePins;
    }

    function onPinHover(destinationX, destinationY, pin) {
        removeHighlight(this, this.activeSquare);

        var originLogicalField = this.renderedBoard.logicalBoard.getFieldByPin(pin);
        var targetRenderedField = this.renderedBoard.getRenderedFieldAtXY(destinationX, destinationY);
        
        if (targetRenderedField !== null) {   
            var moveIsLegal = gameMaster.isMoveLegal(this.playerColor, originLogicalField, targetRenderedField.logicalField);
            
            if (moveIsLegal) {
                this.activeSquare = this.renderedFields[targetRenderedField.logicalField.number - 1];
                this.activeSquare.actions.highlight(); 
            }
        }
    }

    function _generatePin(pin, bitmapField) {

        return {
            color: pin.color,
            id: pin.id,
            top: bitmapField.center.y,
            left: bitmapField.center.x
        }
    }

    function removeHighlight(scope, square) {
        if (square  !== undefined) {
            square.actions.removeHighlight(); // bound to directive!
            scope.activeSquare = undefined;  // prevent repeat deHighlight if no new highlight been made!
        }
    }

    function returnPinToField(pin, field) {
        var fieldX = field.center.x - 30;
        var fieldY = field.center.y - 30;
        pin.api.animateTo(fieldX, fieldY);
    }
}

