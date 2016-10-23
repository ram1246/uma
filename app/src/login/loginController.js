define(function() {
    'use strict';

    var loginController = function ($scope, $rootScope, $state, $window, idle, $firebaseAuth, $firebaseObject) {

        var auth = $firebaseAuth();

        $scope.isUserLoggedIn = false;

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Loging in...';
        $scope.backdrop = true;
        $scope.promise = null;

        var ref = firebase.database().ref();
        var userRef = ref.child("users");

        //var users = $firebaseObject(userRef).$asObject();

        var onUserLoginReject = function (error) {
            $scope.isShowLoginError = true;
            $scope.loginErrorMessage = error.message;
        };

        $scope.validateUser = function (userName, password) {
            $scope.submitted = true;

            if ($scope.login.email.$valid && $scope.login.password.$valid) {

                $scope.promise = auth.$signInWithEmailAndPassword($scope.email, $scope.password);

                $scope.promise.then(function (firebaseUser) {
                    //console.log("Signed in as:", firebaseUser.uid);
                    getUserName(firebaseUser.uid);
                    $rootScope.$emit('rootScope:userLoggedIn', firebaseUser);
                    $state.transitionTo('home');
                    //idle.watch();
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                    onUserLoginReject(error);
                });
            }
        };

        function getUserName(uid) {
            
        }
    };

    loginController.$inject = ['$scope', '$rootScope', '$state', '$window', 'Idle', '$firebaseAuth', '$firebaseObject'];

    return loginController;
});