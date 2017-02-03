define(function (require) {
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