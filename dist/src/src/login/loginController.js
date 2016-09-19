﻿define(function() {
    'use strict';

    var loginController = function ($scope, $rootScope, $state, $window, authenticationService, idle, $firebaseAuth) {

        var auth = $firebaseAuth();

        $scope.isUserLoggedIn = false;

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Validating...';
        $scope.backdrop = true;
        $scope.promise = null;


        var onUserLoginReject = function (error) {
            $scope.isShowLoginError = true;
            $scope.loginErrorMessage = error.message;
        };

        $scope.email = "ss.varn@gmail.com";
        $scope.password = "password123";

        $scope.validateUser = function (userName, password) {
            $scope.submitted = true;

            if ($scope.login.email.$valid && $scope.login.password.$valid) {

                $scope.promise = auth.$signInWithEmailAndPassword($scope.email, $scope.password);

                $scope.promise.then(function (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                    $state.transitionTo('home');
                    //idle.watch();
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                    onUserLoginReject(error);
                });
            }
        };
        
    };

    loginController.$inject = ['$scope', '$rootScope', '$state', '$window', 'Auth', 'Idle', '$firebaseAuth'];

    return loginController;
});