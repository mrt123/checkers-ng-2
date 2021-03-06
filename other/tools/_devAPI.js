setTimeout(function () {
    
    window._dev = getDevObject();

    startReloadCounter(new Date(), createReloadEl());

    appendDebugDOM();
    
    function getDevObject() {
        return {
            debug: true,
            getService: function (serviceName) {
                return angular.element(document.body).injector().get(serviceName)
            },
            getState: function () {
                return this.getService('$state')
            }
        };
    }

    function startReloadCounter(reloadDate, el) {
        setInterval(function () {
            var secondsSincePageReload = getDiffInSeconds(new Date(), reloadDate);
            el.children().text('Reloaded ' + secondsSincePageReload + ' seconds ago.');
        }, 1000);
    }

    function createReloadEl() {
        // wrapping in extra div avoids chrome DOM inspector performance issues.
        var devEl = angular.element('<div><div id="ch-dev"></div>');

        devEl.css({
            background: 'white',
            position: 'fixed',
            bottom: '0',
            opacity: '0.5',
            'font-size': '16px'
        });

        angular.element(document.querySelector('html')).append(devEl);
        return devEl;
    }

    function appendDebugDOM() {
        var squares = $('ch-square');
        generateDebugInfoOnElements(squares, squareViewUpdater);
        var pins = $('ch-pin');
        generateDebugInfoOnElements(pins, pinViewUpdater);
    }

    function getDiffInSeconds(date1, date2) {
        var dif = date1.getTime() - date2.getTime();
        var diffInSeconds = dif / 1000;
        return parseInt(diffInSeconds);
    }

    function generateDebugInfoOnElements(elements, viewUpdater) {

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            viewUpdater(el);
        }
    }

    function pinViewUpdater(el) {
        var newDiv = $('<div>', {
            'class': 'debug',
            text: el.getAttribute('id'),
            css: {
                color: 'red',
                'text-align': 'center',
                'line-height': '60px'
            }
        });
        
        newDiv.appendTo(el);
    }

    function squareViewUpdater(el) {
        var newDiv = $('<div>', {
            'class': 'debug',
            text: el.getAttribute('number')
        });

        newDiv.appendTo($(el).find('.matrix'));
    }
}, 2000);

// TODO: hold debug state in local storage