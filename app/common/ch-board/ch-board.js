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

function ChBoardCtrl(RenderedField) {

    this.renderedFields = this.renderedBoard.renderedFields;
    this.pins = _getScopePins(this.renderedBoard);
    this.onPinHover = onPinHover;
    this.onPinDrop = onPinDrop;
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
            var targetLogicalField = targetRenderedField.logicalField;
            var moveIsLegal = gameMaster.isMoveLegal(this.playerColor, originLogicalField, targetLogicalField);
            
            if (moveIsLegal) {
                this.activeSquare = this.renderedFields[targetLogicalField.number - 1];
                this.activeSquare.actions.highlight(); 
            }
        }
    }

    function onPinDrop (destinationX, destinationY, pin) {

        var originLogicalField = this.renderedBoard.logicalBoard.getFieldByPin(pin);
        var originRenderedField = new RenderedField(originLogicalField);   // TODO impl inhertiance to avoid referencing multiple types
        var targetRenderedField = this.renderedBoard.getRenderedFieldAtXY(destinationX, destinationY);

        if (targetRenderedField !== null) {
            var targetLogicalField = targetRenderedField.logicalField;
            

            if (gameMaster.isMoveLegal(originLogicalField, targetLogicalField)) { // drop the Pin
                var newFieldX = targetLogicalField.center.x - 30;
                var newFieldY = targetLogicalField.center.y - 30;

                //  show dropping of the Pin
                pin.api.leaveAt(newFieldX, newFieldY);

                // update game
                gameMaster.board.movePinToField(originLogicalField.pin, targetLogicalField)
            }
            else {
                returnPinToField(pin, originRenderedField);
            }
            removeHighlight(this.activeSquare);
        }
        else {
            returnPinToField(pin, originRenderedField);
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

