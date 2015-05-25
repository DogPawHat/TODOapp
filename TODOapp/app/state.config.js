/// <reference path="app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    'use strict';
    TODOApp.stateNames = {
        main: "main",
        newThing: "newThing",
        datePicker: "datePicker"
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
                    templateUrl: "app/areas/newthing/newThingHeader.html",
                },
                content: {
                    templateUrl: "app/areas/newthing/newThingContent.html",
                    controller: "NewThingCtrl",
                    controllerAs: "newThingCtrl"
                }
            },
            url: '/add'
        },
        datePicker: {
            name: TODOApp.stateNames.datePicker,
            views: {
                content: {
                    templateUrl: "app/areas/datepicker/datepicker.html"
                }
            },
            url: '/datepicker'
        }
    };
    TODOApp.TODOAppModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state(TODOApp.states.main).state(TODOApp.states.newThing).state(TODOApp.states.datePicker);
        $urlRouterProvider.otherwise('/');
    });
})(TODOApp || (TODOApp = {}));
//# sourceMappingURL=state.config.js.map