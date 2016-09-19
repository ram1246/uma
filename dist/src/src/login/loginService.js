define(function () {
    'user strict';
    var loginService = function ($q, userApiProxy) {
        var self = this;

        self.registerUser = function(userData) {
            var deferred = $q.defer();

            userApiProxy.registerUser(userData).then(function(data) {
                if (!_.isEmpty(data)) {
                    deferred.resolve(data);
                }
            }, function (error) {
                deferred.reject(error);
            });
        };
    };

    loginService.$inject = ['$q', 'dk.userApiProxy'];
    return loginService;
});