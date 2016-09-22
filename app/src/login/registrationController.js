define(function () {
    'use strict';

    var registrationController = function ($scope, $firebaseObject, $firebaseAuth) {

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Loging in...';
        $scope.backdrop = true;
        $scope.promise = null;

        var self = this;

        var auth = $firebaseAuth();

        var ref = firebase.database().ref();

        var userData = ref.child("users"); //ref.child("users");

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

        $scope.user = {
            "firstName": "Ram",
            "middleName": "M",
            "lastName": "Manoher",
            "address": "123 Main St, Chicago, IL 60067",
            "username": "ss.varn@gmail.com",
            "password": "password123",
            "confirmPassword": "password123"
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

        function createUser(user) {
            var additionUserDetails = {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                address: user.address
            };

            $scope.promise = auth.$createUserWithEmailAndPassword(user.email, user.password);

            $scope.promise
                .then(function (firebaseUser) {
                    addUserDetails(additionUserDetails);
                    onUserRegistrationSuccess();
                    console.log("User created with uid: " + firebaseUser.uid)
                })
                .catch(function (error) {
                    console.log(error);
                    onUserRegistrationReject(error);
               });
        }

        function addUserDetails(user) {
            userData.set(user);
        }

    };

    registrationController.$inject = ["$scope", "$firebaseObject", "$firebaseAuth"];

    return registrationController;
});