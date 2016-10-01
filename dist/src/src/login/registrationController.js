define(function () {
    'use strict';

    var registrationController = function ($scope, $firebaseObject, $firebaseAuth) {

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Please wait...';
        $scope.backdrop = true;
        $scope.promise = null;

        var self = this;

        var auth = $firebaseAuth();

        var ref = firebase.database().ref();

        var userData = ref.child("users");

        $scope.submitted = false;

        $scope.showMessageRegistration = false;

        var onUserRegistrationReject = function (error) {
            $scope.showMessageRegistration = true;
            $scope.successMessage = error.message;
        };

        var onUserRegistrationSuccess = function () {
            $scope.showMessageRegistration = true;
            $scope.successMessage = "Registration successful.";
        };

        $scope.registerUser = function (form, user) {
            var userToSave = {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                address: user.address,
                email: user.username,
                password: user.password
            };
            createUser(userToSave);
        };

        function createUser(user, userId) {
            
            $scope.promise = auth.$createUserWithEmailAndPassword(user.email, user.password);

            $scope.promise
                .then(function (firebaseUser) {
                    var additionUserDetails = {
                        uid: firebaseUser.uid,
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        address: user.address
                    };
                    addUserDetails(additionUserDetails);
                    onUserRegistrationSuccess();
                    console.log("User created with uid: " + firebaseUser.uid)
                })
                .catch(function (error) {
                    console.log(error);
                    onUserRegistrationReject(error);
                });
        }

        function addUserDetails(additionUserDetails) {
            userData.push(additionUserDetails);
        }

    };

    registrationController.$inject = ["$scope", "$firebaseObject", "$firebaseAuth"];

    return registrationController;
});