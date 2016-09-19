define([], function() {
    'use strict';

    var baseApiProxy = function ($http, $q, validatorService) {
        var self = this;

        var isApiResponseInvalid = function (response) {
            return (!response && validatorService.isValidJson(response));
        };

        self.getJSONHttpConfig = function(api, method, params, data) {
            var config = {
                url: api,
                method: method,
                data: data,
                params: params,
                timeout: 30000
            };
            return config;
        };

        self.getApiResponse = function(apiConfig) {
            var deferred = $q.defer();
            $http(apiConfig)
                .success(function(data) {
                    return isApiResponseInvalid(data) ? self.rejectResponse(data) : deferred.resolve(data);
                })
                .error(function(error) {
                    self.rejectResponse(error);
                });
            return deferred.promise;
        };

        self.rejectResponse = function (data) {
            var deferred = $q.defer();
            return deferred.reject(data);
        };
    };

    baseApiProxy.$inject = ['$http', '$q' ,'dk.validatorService'];
    return baseApiProxy;
});