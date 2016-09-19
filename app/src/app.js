define(function (require) {
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