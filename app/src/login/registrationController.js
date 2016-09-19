define(function () {
    'use strict';

    var registrationController = function ($scope, $firebaseObject, $firebaseAuth) {
        var self = this;

        var auth = $firebaseAuth();

        $scope.submitted = false;

        var onUserRegistrationReject = function (error) {

        };

        var onUserRegistrationSuccess = function (email) {

        };

        $scope.registerUser = function (form, user) {
            var x = {
                firstName: "test1",
                middleName: "test2",
                lastName: "test3",
                address: "123 main street, Chicago, IL 60067",
                email: "ss.varn@gmail.com",
                password: "password123"
            };
            createUser(x);
        };

        function createUser(userData) {
            auth.$createUserWithEmailAndPassword(userData.email, userData.password)
                .then(function (firebaseUser) {
                    console.log("User created with uid: " + firebaseUser.uid)
                })
                .catch(function (error) {
                    console.log(error);
               });
        }
    };

    registrationController.$inject = ["$scope", "$firebaseObject", "$firebaseAuth"];

    return registrationController;
});