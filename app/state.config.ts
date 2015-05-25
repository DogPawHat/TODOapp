/// <reference path="app.bundle.ts" />
module TODOApp {
    'use strict';

    export var stateNames = {
        main: "main",
        newThing: "newThing",
        datePicker: "datePicker"
    }

    export var states: IStatesObject = {
        main: {
            name: stateNames.main,
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
            name: stateNames.newThing,
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
            name: stateNames.datePicker,
            views: {
                content: {
                    templateUrl: "app/areas/datepicker/datepicker.html"
                }
            },
            url: '/datepicker'
        }
    }

    TODOAppModule.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state(states.main).state(states.newThing).state(states.datePicker);
        $urlRouterProvider.otherwise('/');
    });

}