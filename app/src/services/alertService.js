define(function () {
    'user strict';
    var alertService = function (inform) {
        var self = this;

        self.addAlert = function(alert, type) {
            inform.add(alert, {
                ttl: 2000, type: type
            });
        };

        self.addAlertWithoutTimeToLive = function (alert, type) {
            inform.add(alert, {
                ttl: 0, type: type
            });
        };

        self.removeAlert = function (id) {
            inform.remove(id);
        };

        self.clearAlert = function () {
            inform.clear();
        };
    };

    alertService.$inject = ['inform'];
    return alertService;
});