define(function () {
    'use strict';

    var forgotPasswordController = function ($scope) {
        var self = this;
        $scope.isUserLoggedIn = false;

        $scope.controllerName = "forgotPasswordController";

        $scope.showMessageForgotPassword = true;
        
        $scope.Submit = function () {
            $scope.showMessageForgotPassword = false;
        };
    };

    forgotPasswordController.$inject = ['$scope'];

    return forgotPasswordController;
});