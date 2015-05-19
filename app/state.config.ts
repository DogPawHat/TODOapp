/// <reference path="app.bundle.ts" />
module TODOApp {
    'use strict';

    export var stateNames = {
        main: "main",
        newThing: "newThing",
    }

    export var states: IStatesObject = {
        main: {
            name: stateNames.main,
            views: {
                header: {
                    templateUrl: "areas/main/mainHeader.html",
                    controller: "MainHeaderCtrl",
                    controllerAs: "mainHeaderCtrl"
                },
                content: {
                    templateUrl: "areas/main/mainContent.html",
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
                    templateUrl: "areas/newThing/newThingHeader.html",
                },
                content: {
                    templateUrl: "areas/newThing/newThingContent.html",
                    controller: "NewThingCtrl",
                    controllerAs: "newThingCtrl"
                }
            },
            url: '/add'
        }
    }

    TODOAppModule.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state(states.main).state(states.newThing);
        $urlRouterProvider.otherwise('/');
    });

}