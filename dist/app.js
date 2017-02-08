/**
 * uma.ui - 2017/02/08 03:02:49 UTC
*/
define('route/routes',[],function () {
    var routes = function ($stateProvider, $urlRouterProvider) {

        function resolveControllerDataByRoute(controllerIdentifier) {
            
        }

        $urlRouterProvider.otherwise("/intro");

        $stateProvider
            .state('intro', {
                url: "/intro",
                templateUrl: "home.html",
                resolve: resolveControllerDataByRoute("login"),
                data: {}
            })
            .state('login', {
                url: "/login",
                templateUrl: "login.html",
                controller: 'loginController',
                resolve: resolveControllerDataByRoute("login"),
                data: {}
            })
            .state('registration', {
                url: "/registration",
                templateUrl: "registration.html",
                controller: 'registrationController',
                resolve: resolveControllerDataByRoute("registration"),
                data: {}
            })
            .state('forgotpassword', {
                url: "/forgotpassword",
                templateUrl: "forgotpassword.html",
                controller: 'forgotPasswordController',
                data: {}
            })
            .state('home', {
                url: "/home",
                templateUrl: "home.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('about', {
                url: "/about",
                templateUrl: "about.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('contactus', {
                url: "/contactus",
                templateUrl: "contactus.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('initiatives', {
                url: "/initiatives",
                templateUrl: "initiatives.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('pastevents', {
                url: "/pastevents",
                templateUrl: "pastevents.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('upcomingevents', {
                url: "/upcomingevents",
                templateUrl: "upcomingevents.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('donate', {
                url: "/donate",
                templateUrl: "donate.html",
                data: {},
                resolve: resolveControllerDataByRoute("home")
            })
            .state('userprofile', {
                url: "/userprofile",
                templateUrl: "userprofile.html",
                controller: 'userProfileController',
                resolve: {
                    // controller will not be loaded until $requireSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the factory below
                    "currentAuth": ["Auth", function (Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }]
                }
            })
    };

    return routes;
});
define('login/loginController',[],function() {
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
define('login/parentController',[],function() {
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
define('login/registrationController',[],function () {
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

        $scope.getPattern = function (user) {
            if (user) {
                return user.password && user.password.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
            }
        }

        $scope.registerUser = function (form, user) {
            $scope.submitted = true;

            if (!user) {
                return;
            }

            if (user.middleName === undefined) {
                user.middleName = "";
            };

            var userToSave = {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                address: user.address,
                city: user.city,
                state: user.state,
                zip: user.zip,
                email: user.username,
                password: user.password
            };

            if (form.$valid) {
                createUser(userToSave);
            }
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
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zip: user.zip
                    };
                    addUserDetails(additionUserDetails);
                    onUserRegistrationSuccess();
                    console.log("User created with uid: " + firebaseUser.uid)
                })
                .catch(function (error) {
                    console.log(error);
                    onUserRegistrationReject(error);
                });
        };

        function addUserDetails(additionUserDetails) {
            userData.push(additionUserDetails);
        };

    };

    registrationController.$inject = ["$scope", "$firebaseObject", "$firebaseAuth"];

    return registrationController;
});
define('app',['require','angular','route/routes','login/loginController','login/parentController','login/registrationController'],function (require) {
    'use strict';

    var angular = require('angular');
    var routes = require('route/routes');

    var loginController = require('login/loginController');
    var parentController = require('login/parentController');
    var registrationController = require('login/registrationController');


    var app = angular.module('myApp', ["ui.router", "inform", "ngIdle", "cgBusy", "firebase", "ui.bootstrap" ]);

    app.config(routes);

    app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
        return $firebaseAuth();
    }]);

    app
        .controller('ParentController', parentController)
        .controller('loginController', loginController)
        .controller('registrationController', registrationController)
        
        .run(function ($rootScope, $state) {
            $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                // We can catch the error thrown when the $requireSignIn promise is rejected
                // and redirect the user back to the home page
                if (error === "AUTH_REQUIRED") {
                    console.log("login required");
                    $state.go("login");
                }
            });

            /* To show current active state on menu */
            $rootScope.getClass = function (path) {
                if ($state.current.name === path) {
                    return "active";
                } else {
                    return "";
                }
            };
        });

    app.init = function () {
        angular.bootstrap(document, ['myApp']);
    };

    return app;
});
