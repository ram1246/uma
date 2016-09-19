define(function () {
    'use strict';

    var userApiProxy = function ($http, $q, validatorService, $firebaseObject) {
        var self = this;

        var ref = firebase.database().ref().child("users");

        var isApiResponseInvalid = function (response) {
            return (!response && validatorService.isValidJson(response));
        };

        self.checkUserLogins = function (userId, password) {
            var deferred = $q.defer();

            var usersRef = $firebaseObject(ref);

            ref.authWithPassword({
                email: userId,
                password: password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });

            //return deferred.promise;
        };

        //self.registerUser = function (userRegistrationData) {
        //    var deferred = $q.defer();
        //    var url = config.loginUrl + "/v1/users";

        //    var httpConfig = baseApiProxy.getJSONHttpConfig(url, serviceConstant.httpVerb.PUT, '', userRegistrationData);

        //    $http(httpConfig)
        //        .success(function (data) {
        //            if (isApiResponseInvalid(data)) {
        //                deferred.reject(data);
        //            } else {
        //                deferred.resolve(data);
        //            }
        //        })
        //        .error(function (error) {
        //            deferred.reject(error);
        //        });
        //    return deferred.promise;
        //};


        //self.logout = function () {
        //    var deferred = $q.defer();
        //    var formData = "",
        //        url = config.loginUrl + "/user/logout";

        //    var httpConfig = baseApiProxy.getJSONHttpConfig(url, serviceConstant.httpVerb.POST, '', formData);

        //    $http(httpConfig)
        //        .success(function (data) {
        //            if (isApiResponseInvalid(data)) {
        //                deferred.reject(data);
        //            } else {
        //                deferred.resolve(data);
        //            }
        //        })
        //        .error(function (error) {
        //            deferred.reject(error);
        //        });
        //    return deferred.promise;
        //};
    };

    userApiProxy.$inject = ['$http', '$q', 'validatorService', '$firebaseObject'];
    return userApiProxy;
});