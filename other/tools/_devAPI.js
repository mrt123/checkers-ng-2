var log = console.log;
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
    return $("<div>", {
        'id': "dev",
        css: {
            background: 'white',
            position: 'fixed',
            bottom: 0,
            opacity: 0.5,
            'font-size': '16px'
        }
    }).appendTo($('html'));
}

function getDiffInSeconds(date1, date2) {
    var dif = date1.getTime() - date2.getTime();
    var diffInSeconds = dif / 1000;
    return parseInt(diffInSeconds);
}

function startReloadCounter(reloadDate, el) {
    setInterval(function () {
        var parsedSeconds = getDiffInSeconds(new Date(), reloadDate);
        el.html('Reloaded ' + parsedSeconds + ' seconds ago.');
    }, 1000);
}