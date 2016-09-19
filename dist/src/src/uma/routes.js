define(function () {
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