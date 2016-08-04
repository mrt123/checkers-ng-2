angular.module('ch-square', []).directive('chSquare', [function () {

    return {
        restrict: 'E',
        scope: {
            // @ assign string representation (one way)
            // = assign actual scope model (two way) - can be used for controls
            // & create a delegate function
            //for @var remember to use hyphen based notation on bound attributes.
            color: '@',
            number: '@',
            actions: '='
        },
        link: function (scope, element, attr) {
            scope.$on('debug', function (event, value) {
                scope.debug = value;
            });

            scope.actions = {
                highlight: highlight.bind(undefined, element),
                removeHighlight: removeHighlight.bind(undefined, element)
            };

            element.on('mousedown', function (event) {
                // Prevent 'default' dragging of this square
                event.preventDefault();
            });
        },
        templateUrl: 'common/ch-square/ch-square.html'


    };

    function highlight(element) {
        element.find('.matrix').addClass("highlight");
    }

    function removeHighlight(element) {
        element.find('.matrix').removeClass("highlight");
    }

}]);