/// <reference path="app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    'use strict';
    TODOApp.stateNames = {
        main: "main",
        newThing: "newThing",
    };
    TODOApp.states = {
        main: {
            name: TODOApp.stateNames.main,
            views: {
                header: {
                    templateUrl: "app/areas/main/mainHeader.html",
                    controller: "MainHeaderCtrl",
                    controllerAs: "mainHeaderCtrl"
                },
                content: {
                    templateUrl: "app/areas/main/mainContent.html",
                    controller: "MainCtrl",
                    controllerAs: "mainCtrl"
                }
            },
            url: '/'
        },
        newThing: {
            name: TODOApp.stateNames.newThing,
            views: {
                header: {
                    templateUrl: "app/areas/newThing/newThingHeader.html",
                },
                content: {
                    templateUrl: "appp/areas/newThing/newThingContent.html",
                    controller: "NewThingCtrl",
                    controllerAs: "newThingCtrl"
                }
            },
            url: '/add'
        }
    };
    TODOApp.TODOAppModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state(TODOApp.states.main).state(TODOApp.states.newThing);
        $urlRouterProvider.otherwise('/');
    });
})(TODOApp || (TODOApp = {}));
//# sourceMappingURL=state.config.js.map