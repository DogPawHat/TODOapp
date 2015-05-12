module TODOApp {
    'use strict';

    export var stateNames = {
        main: "main",
        newThing: "newThing",
    }

    export interface statesObject {
        main: ng.ui.IState;
        newThing: ng.ui.IState;
    }

    export var states: statesObject = {
        main: {
            name: stateNames.main,
            templateUrl: "areas/main/main.html",
            url: ''
        },
        newThing: {
            name: stateNames.newThing,
            templateUrl: "areas/newThing/newThing.html",
            url: '/add'
        }
    }


    TODOAppModule.config(($stateProvider: ng.ui.IStateProvider) => {
        $stateProvider.state(states.main).state(states.newThing);
    });

}