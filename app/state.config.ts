﻿/// <reference path="app.bundle.ts" />
module TODOApp {
    'use strict';

    export var stateNames = {
        main: "main",
        newThing: "newThing",
    }

    export var states: IStatesObject = {
        main: {
            name: stateNames.main,
            templateUrl: "/areas/main/main.html",
            controller: "MainCtrl",
            controllerAs: "mainCtrl",
            url: ''
        },
        newThing: {
            name: stateNames.newThing,
            templateUrl: "/areas/newThing/newThing.html",
            controller: "MainCtrl",
            controllerAs: "newThingCtrl",
            url: '/add'
        }
    }

    TODOAppModule.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state(states.main).state(states.newThing);
        
    });

}