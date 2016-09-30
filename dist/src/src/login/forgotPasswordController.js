define(function () {
    'use strict';

    var forgotPasswordController = function ($scope, $firebaseAuth) {

        var auth = $firebaseAuth();

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Loging in...';
        $scope.backdrop = true;
        $scope.promise = null;

        $scope.submitted = false;

        $scope.email = 'ss.varn@gmail.com';

        $scope.sendPasswordResetEmail = function () {
            $scope.submitted = true;

            if ($scope.forgotpassword.email.$valid) {

                $scope.promise = auth.$sendPasswordResetEmail($scope.email);

                $scope.promise.then(function () {
                    $scope.successMessage = "Password reset email sent successfully!";
                    $scope.showMessageRegistration = true;
                }).catch(function (error) {
                    $scope.successMessage = "Error while sending password reset email, Please try again later";
                });
            }
        };
    };

    forgotPasswordController.$inject = ['$scope', '$firebaseAuth'];

    return forgotPasswordController;
});