define(function() {
    'use strict';

    var parentController = function ($scope, $rootScope, $state, $uibModal, $timeout, $firebaseAuth) {

        var uid = "";
        $scope.isLoggedOut = false;

        var authObj = $firebaseAuth();

        $scope.firebaseUser = authObj.$getAuth();

        var ref = firebase.database().ref();
        var usersRef = ref.child("users");

        var showLoginPage = function() {
            $state.go('login');
        };

        var showLoginPageAfterLogout = function() {
            $scope.isLoggedOut = true;
            $state.go('login');
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
            $scope.firebaseUser = authObj.$getAuth();
            setUserName($scope.firebaseUser.uid)
        });

        function setUserName(uid) {
            var query = usersRef.orderByChild("uid").equalTo(uid);
            query.on("child_added", function (snapshot) {
                $scope.$apply(function () {
                    $scope.userName = snapshot.val()["firstName"] + ' ' + snapshot.val()["lastName"]
                });
            });
        }

        setUserName(uid);
    };

    parentController.$inject = ['$scope', '$rootScope', '$state', '$uibModal', '$timeout', "$firebaseAuth"];

    return parentController;
});