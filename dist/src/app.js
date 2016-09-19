/**
 * uma.ui - 2016/09/19 02:35:51 UTC
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
define('login/parentController',[],function() {
    'use strict';

    var parentController = function($scope, $rootScope, $state, Auth, $uibModal, $timeout) {

        $scope.isLoggedOut = false;

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


        $scope.currentUser = null;
        
    };

    parentController.$inject = ['$scope', '$rootScope', '$state', 'Auth', '$uibModal', '$timeout'];

    return parentController;
});
define('login/registrationController',[],function () {
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
define('app',['require','angular','route/routes','login/session','login/loginController','login/parentController','login/registrationController','login/authenticationService','login/loginConstant'],function (require) {
    'use strict';

    var angular = require('angular');
    var routes = require('route/routes');

    var session = require('login/session');
    //var authIntercepter = require('login/authIntercepter');
    var loginController = require('login/loginController');
    var parentController = require('login/parentController');
    var registrationController = require('login/registrationController');
    //var forgotPasswordController = require('login/forgotPasswordController');
    //var configConstant = require('src/src/config/config');
    //var serviceConstant = require('src/src/services/serviceConstant');
    //var baseApiProxy = require('src/src/apiProxies/baseApiProxy');
    //var organizationApiProxy = require('src/src/apiProxies/organizationApiProxy');
    var authenticationService = require('login/authenticationService');
    //var formAutofillFixDirective = require('login/formAutofillFixDirective');
    var loginConstant = require('login/loginConstant');
    //var routes = require('route/routes');
    //var translateService = require('src/src/services/translateService');
    //var loginService = require('login/loginService');
    //var utilitiesService = require('src/src/services/utilities');
    //var alertTypeConstant = require('src/src/services/alertTypeConstant');
    //var alertService = require('src/src/services/alertService');


    var app = angular.module('myApp', ["ui.router", "inform", "ngIdle", "cgBusy", "firebase", "ui.bootstrap" ]);

    app.config(routes);

    app
        .controller('ParentController', parentController)
        .controller('loginController', loginController)
        .controller('registrationController', registrationController)
        //.controller('forgotPasswordController', forgotPasswordController)
        //.service('utilitiesService', utilitiesService)
        .service('Auth', authenticationService)
        //.service('dk.loginService', loginService)
        //.service('baseApiProxy', baseApiProxy)
        //.service('organizationApiProxy', organizationApiProxy)
        //.service('AuthInterceptor', authIntercepter)
        //.service('translateService', translateService)
        //.constant('dk.serviceConstant', serviceConstant)
        //.constant('dk.configConstant', configConstant)
        //.constant('USER_ROLES', loginConstant.USER_ROLES)
        //.constant('alertTypeConstant', alertTypeConstant)
        //.service('alertService', alertService)
        //.directive('formAutofillFix', formAutofillFixDirective)
        //.config(function ($httpProvider) {
        //    $httpProvider.interceptors.push([
        //        '$injector',
        //        function ($injector) {
        //            return $injector.get('AuthInterceptor');
        //        }
        //    ]);
        //})
        .run(function ($rootScope, $state, Auth) {
            //before each state change, check if the user is logged in
            //and authorized to move onto the next state
            //console.log($state);
            //$rootScope.$on('$stateChangeStart', function (event, next) {
            //    var authorizedRoles = next.data.authorizedRoles;

            //    if (authorizedRoles[0] === "initial") {
            //        return;
            //    }

            //    if (!Auth.isAuthorized(authorizedRoles)) {
            //        event.preventDefault();
            //        if (Auth.isAuthenticated()) {
            //            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            //        } else {
            //            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            //        }
            //    }
            //});

            /* To show current active state on menu */
            $rootScope.getClass = function (path) {
                if ($state.current.name === path) {
                    return "active";
                } else {
                    return "";
                }
            };

            $rootScope.logout = function () {
                Auth.logout();
            };
        });

    app.init = function () {
        angular.bootstrap(document, ['myApp']);
    };

    return app;
});
