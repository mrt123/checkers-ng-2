var _dev = (function () {
    
    var _dev = {
        debug: false,
        getService: function (serviceName) {
            return angular.element(document.body).injector().get(serviceName)
        },
        getState: function () {
            return this.getService('$state')
        }
    };

    startReloadCounter(new Date(), createDevElement());

    function createDevElement() {
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

    function getDiffInSeconds(date1, date2) {
        var dif = date1.getTime() - date2.getTime();
        var diffInSeconds = dif / 1000;
        return parseInt(diffInSeconds);
    }

    function startReloadCounter(reloadDate, el) {
        setInterval(function () {
            var parsedSeconds = getDiffInSeconds(new Date(), reloadDate);
            el.children().text('Reloaded ' + parsedSeconds + ' seconds ago.');
        }, 1000);
    }

    return _dev;
})();
