define(function () {
    'use strict';

    var userProfileController = function ($scope, $rootScope, $state, $firebaseAuth, currentAuth) {
        var auth = $firebaseAuth();
               
        $scope.showEmailReset = false;
        
        $scope.sendPasswordResetEmail = function () {
            auth.$sendPasswordResetEmail(currentAuth.email).then(function () {
                console.log("Password reset email sent successfully!");
                $scope.successMessage = "Password reset email sent successfully!";
                $scope.showMessageRegistration = true;
            }).catch(function (error) {
                console.error("Error: ", error);
                $scope.successMessage = "Error while sending password reset email, Please try again later";
            });
        };
    };

    userProfileController.$inject = ["$scope", "$rootScope", "$state", "$firebaseAuth", "currentAuth"];

    return userProfileController;
});