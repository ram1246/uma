define(function() {
    'use strict';

    var loginController = function ($scope, $rootScope, $state, $window, idle, $firebaseAuth) {

        var auth = $firebaseAuth();

        $scope.isUserLoggedIn = false;

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Loging in...';
        $scope.backdrop = true;
        $scope.promise = null;

        var ref = firebase.database().ref();
        var usersRef = ref.child("users");


        var onUserLoginReject = function (error) {
            $scope.isShowLoginError = true;
            $scope.loginErrorMessage = error.message;
        };

        $scope.validateUser = function (userName, password) {
            $scope.submitted = true;

            if ($scope.login.email.$valid && $scope.login.password.$valid) {

                $scope.promise = auth.$signInWithEmailAndPassword($scope.email, $scope.password);

                $scope.promise.then(function (firebaseUser) {
                    $rootScope.$emit('rootScope:userLoggedIn', firebaseUser);
                    $state.transitionTo('home');
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                    onUserLoginReject(error);
                });
            }
        };
    };

    loginController.$inject = ['$scope', '$rootScope', '$state', '$window', 'Idle', '$firebaseAuth'];

    return loginController;
});