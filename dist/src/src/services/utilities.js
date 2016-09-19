define(function () {
    'user strict';
    var utilitiesService = function () {
        var self = this;

        self.guid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    };
    utilitiesService.$inject = [];
    return utilitiesService;
});