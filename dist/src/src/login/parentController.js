define(function() {
    'use strict';

    var parentController = function ($scope, $rootScope, $state, $uibModal, $timeout, $firebaseAuth) {

        $scope.isLoggedOut = false;

        var authObj = $firebaseAuth();

        $scope.firebaseUser = authObj.$getAuth();

        var showLoginPage = function() {
            $state.go('login');
        };

        var showLoginPageAfterLogout = function() {
            $scope.isLoggedOut = true;
            $state.go('login');
        };

        var setCurrentUser = function() {
            $scope.currentUser = $rootScope.currentUser;
            $scope.isUserLoggedIn = true;
        };

        var showNotAuthorized = function() {
            console.log("Not Authorized");
        };


        $scope.started = false;

        function closeModals() {
            if ($scope.warning) {
                $scope.warning.close();
                $scope.warning = null;
            }

            if ($scope.timedout) {
                $scope.timedout.close();
                $scope.timedout = null;
            }
        }

        $scope.$on('IdleStart', function() {
            closeModals();

            $scope.warning = $uibModal.open({
                templateUrl: 'warning-dialog.html',
                windowClass: 'modal-danger'
            });
        });

        $scope.$on('IdleEnd', function() {
            closeModals();
        });

        $scope.$on('IdleTimeout', function() {
            closeModals();
            $scope.timedout = $uibModal.open({
                templateUrl: 'timedout-dialog.html',
                windowClass: 'modal-danger'
            });

            $scope.isUserLoggedIn = false;
            $state.go('login');
        });

        $scope.logout = function () {
            authObj.$signOut();
            $scope.firebaseUser = false;
            showLoginPageAfterLogout();
        };

        $rootScope.$on('rootScope:userLoggedIn', function (event, data) {
            console.log(data); // 'Emit!'
            $scope.firebaseUser = authObj.$getAuth();
        });

        $scope.currentUser = null;
    };

    parentController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$timeout', "$firebaseAuth"];

    return parentController;
});