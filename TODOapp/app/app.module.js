/// <reference path="app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    'use strict';
    TODOApp.TODOAppModule = angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'infinite-scroll',
        'ngMessages',
        'LocalForageModule'
    ]).config(function ($localForageProvider) {
        $localForageProvider.config({
            name: "TODODB",
            storeName: "thingsToDo"
        });
    });
})(TODOApp || (TODOApp = {}));
//# sourceMappingURL=app.module.js.map