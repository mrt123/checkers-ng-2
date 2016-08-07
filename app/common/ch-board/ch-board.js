angular
    .module('ch-board', [])
    .directive('chBoard', board);

function board() {
    return {
        bindToController: true,
        controller: BoardCtrl,
        controllerAs: 'vm',
        link: link,
        restrict: 'E',
        scope: {
            board: '='
        },
        templateUrl: 'common/ch-board/ch-board.html'
    };
}

function link($scope, element, attrs) {

}

function BoardCtrl() {
    console.log(this.board.fields);

    this.fields = this.board.renderedFields;
    this.pins = _getScopePins(this.board);
}

function _getScopePins(renderedBoard) {
    var scopePins = [];
    
    var renderedFields = renderedBoard.renderedFields;
    
    for (var i = 0; i < renderedFields.length; i++) {
        
        var renderedField = renderedFields[i];
        var pin = renderedField.logicalField.pin;
        
        if(pin) {
            var scopePin = _getPin(pin, renderedField);
            scopePins.push(scopePin);
        }
    }
    return scopePins;
}

function _getPin(pin, bitmapField) {
    
    return {
        color: pin.color,
        id: pin.id,
        top: bitmapField.center.y,
        left: bitmapField.center.x
    }
}