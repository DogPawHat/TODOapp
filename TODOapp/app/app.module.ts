/// <reference path="app.bundle.ts" />

module TODOApp {
    'use strict';

    export var TODOAppModule: ng.IModule =
        angular.module('app',
            [
                'ui.router',
                'infinite-scroll',
                'angular-locker',
                'ngMessages',
                'localForage'
            ]);

}