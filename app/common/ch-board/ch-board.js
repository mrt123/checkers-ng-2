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
            game: '=',
            fields: '=',
            pins: '='
        },
        templateUrl: 'common/ch-board/ch-board.html'
    };

    function link($scope, element, attrs) {
            
    }
}


function BoardCtrl() {
    console.log(this.pins)
}