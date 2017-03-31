/**
 * uma.ui - 2017/03/31 02:25:10 UTC
*/

require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        angularAnimate: '../bower_components/angular-animate/angular-animate.min',
        uiRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
        ngResource: '../bower_components/angular-resource/angular-resource',
        angularScenario: '../bower_components/angular-scenario/angular-scenario',
        angularMocks: '../bower_components/angular-mocks/angular-mocks',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        angularBootstrap: '../bower_components/angular-bootstrap/ui-bootstrap',
        angularBootstrapTpl: '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        text: '../bower_components/requirejs-text/text',
        lodash: '../bower_components/lodash/dist/lodash.min',
        ngIdle: '../bower_components/ng-idle/angular-idle.min',
        cgBusy: '/libs/angular-busy',
        angularBreadcrumbs: '../bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs',
        angularInform: '../bower_components/angular-inform/dist/angular-inform.min'
    },
    shim: {
        'jquery': {
            'exports': 'jquery'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angularBootstrap': {
            deps: ['angular', 'jquery', 'bootstrap'],
            'exports': 'angularBootstrap'
        },
        'angularBootstrapTpl': {
            deps: ['angularBootstrap']
        },
        'angular': {
            'exports': 'angular'
        },
        'angularAnimate': {
            deps: ['angular'],
            'angularAnimate': 'ngAnimate'
        },
        'ngResource': {
            deps: ['angular']
        },
        'uiRouter': {
            deps: ['angular']
        },
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'app': {
            deps: [
                'jquery',
                'angular',
                'angularAnimate',
                'bootstrap',
                'uiRouter',
                'ngIdle',
                'angularBootstrapTpl',
                'cgBusy',
                'angularBreadcrumbs',
                'angularInform'
            ]
        },
        'lodash': {
            'lodash': 'lodash'
        },
        'ngIdle': {
            deps: ['angular'],
            'ngIdle': { exports: "ngIdle" }
        },
        'cgBusy': {
            deps: ['angular'],
            'cgBusy': { exports: "cgBusy" }
        },
        'angularTranslateLoaderStaticFiles': {
            deps: [
                'angular',
                'angularTranslate'
            ],
            'angularTranslateLoaderStaticFiles': { exports: 'angularTranslateLoaderStaticFiles' }
        },
        'angularBreadcrumbs': {
            deps: ['angular'],
            'angularBreadcrumbs': { exports: 'angularBreadcrumbs' }
        },
        'angularInform': {
            deps: ['angular'],
            'angularInform': { exports: 'angularInform' }
        }
    },
    priority: [
        "jquery",
        "angular"
    ]
});
require(
    [
        'jquery',
        'app',
        'lodash'
    ],
    function (jQuery, app, lodash) {
        app.init();
        window._ = lodash;
        window.$ = window.jQuery = $;

        $(document).ready(function () {
            $("body").tooltip({ selector: '[data-toggle=tooltip]' });

            $('body').popover({
                selector: '[data-toggle="popover"]',
                trigger: 'hover',
                placement: 'right'
            });
        });
    }
);


