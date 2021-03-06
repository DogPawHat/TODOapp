﻿/// <reference path="app.bundle.ts" />

module TODOApp {
    'use strict';

    export var TODOAppModule: ng.IModule =
        angular.module('app',
            [
                'ui.router',
                'ui.bootstrap',
                'infinite-scroll',
                'ngMessages',
                'LocalForageModule'
            ]).config(($localForageProvider: ng.localForage.ILocalForageProvider) => {
            $localForageProvider.config({
                name: "TODODB",
                storeName: "thingsToDo"
            });
        });

}