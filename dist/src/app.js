/**
 * uma.ui - 2016/10/01 17:17:25 UTC
*/
define('route/routes',[],function () {
    var routes = function ($stateProvider, $urlRouterProvider) {

        function resolveControllerDataByRoute(controllerIdentifier) {
            
        }

        //$urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('intro', {
                url: "/intro",
                templateUrl: "intro.html",
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
define('login/session',[],function() {
    'user strict';
    var session = function() {

        var self = this;

        self.create = function (user) {
            this.user = user;
            this.userRole = user.userRole;
            self.user = user;
        };
        self.destroy = function () {
            this.user = null;
            this.userRole = null;
        };
    };

    session.$inject = [];
    return session;
});
define('login/loginController',[],function() {
    'use strict';

    var loginController = function ($scope, $rootScope, $state, $window, idle, $firebaseAuth, $firebaseObject) {

        var auth = $firebaseAuth();

        $scope.isUserLoggedIn = false;

        $scope.delay = 0;
        $scope.minDuration = 0;
        $scope.message = 'Loging in...';
        $scope.backdrop = true;
        $scope.promise = null;


        var onUserLoginReject = function (error) {
            $scope.isShowLoginError = true;
            $scope.loginErrorMessage = error.message;
        };

        $scope.validateUser = function (userName, password) {
            $scope.submitted = true;

            if ($scope.login.email.$valid && $scope.login.password.$valid) {

                $scope.promise = auth.$signInWithEmailAndPassword($scope.email, $scope.password);

                $scope.promise.then(function (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                    $rootScope.$emit('rootScope:userLoggedIn', firebaseUser);
                    $state.transitionTo('home');
                    //idle.watch();
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                    onUserLoginReject(error);
                });
            }
        };
        
    };

    loginController.$inject = ['$scope', '$rootScope', '$state', '$window', 'Idle', '$firebaseAuth', '$firebaseObject'];

    return loginController;
});
define('login/parentController',[],function() {
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
define('login/authenticationService',[],function() {
    'user strict';
    var authenticationService = function ($firebaseAuth) {
        var self = this;

        var authObj = $firebaseAuth();

        self.logout = function() {
            authObj.$signOut()
            Session.destroy();
            $window.sessionStorage.removeItem("userInfo");
        };
    };

    authenticationService.$inject = ['$firebaseAuth'];
    return authenticationService;
});
define('login/loginConstant',[],function() {
    return {
        "USER_ROLES": {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest',
            contributor: 'Contributor',
            initial: 'initial'
        },
        "AUTH_EVENTS": {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        }
    };
});
define('login/userProfileController',[],function () {
    'use strict';

    var userProfileController = function ($scope, $rootScope, $state, $firebaseAuth, currentAuth) {
        var auth = $firebaseAuth();

        console.log(currentAuth);
        
        $scope.showEmailReset = false;
        
        $scope.sendPasswordResetEmail = function () {
            auth.$sendPasswordResetEmail(currentAuth.email).then(function () {
                console.log("Password reset email sent successfully!");
                $scope.successMessage = "Password reset email sent successfully!";
                $scope.showMessageRegistration = true;
            }).catch(function (error) {
                console.error("Error: ", error);
                $scope.successMessage = "Error while sending password reset email, Please try again later";
            });
        };
    };

    userProfileController.$inject = ["$scope", "$rootScope", "$state", "$firebaseAuth", "currentAuth"];

    return userProfileController;
});
define('login/forgotPasswordController',[],function () {
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
define('app',['require','angular','route/routes','login/session','login/loginController','login/parentController','login/registrationController','login/authenticationService','login/loginConstant','login/userProfileController','login/forgotPasswordController'],function (require) {
    'use strict';

    var angular = require('angular');
    var routes = require('route/routes');

    var session = require('login/session');
    var loginController = require('login/loginController');
    var parentController = require('login/parentController');
    var registrationController = require('login/registrationController');
    var authenticationService = require('login/authenticationService');
    var loginConstant = require('login/loginConstant');
    var userProfileController = require('login/userProfileController');
    var forgotPasswordController = require('login/forgotPasswordController');


    var app = angular.module('myApp', ["ui.router", "inform", "ngIdle", "cgBusy", "firebase", "ui.bootstrap" ]);

    app.config(routes);

    app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
        return $firebaseAuth();
    }]);

    app
        .controller('ParentController', parentController)
        .controller('loginController', loginController)
        .controller('registrationController', registrationController)
        .controller('userProfileController', userProfileController)
        .controller('forgotPasswordController', forgotPasswordController)
        
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
