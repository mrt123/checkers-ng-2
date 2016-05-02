var log = console.log;
var _dev = {

    debug: false,

    /**
     * Notice: service must be previously injected to be present.
     */
    getService: function (serviceName) {
        return angular.element(document.body).injector().get(serviceName)
    },

    getState: function () {
        return this.getService('$state')
    }
};