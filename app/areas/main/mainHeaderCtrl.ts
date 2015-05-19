/// <reference path="../../app.bundle.ts" />
module TODOApp {
    class MainHeaderCtrl {
        $inject = ['$rootScope'];

        filter: string;

        constructor(private $localForage: ng.localForage.ILocalForageService,
            private $rootScope: ng.IRootScopeService) {
            var self = this;
            self.filter = "";

            self.activate();
        }

        activate() {
            var that = this;
            that.$rootScope.$watch(
                () => { return that.filter },
                (newVal, oldVal) => {
                    that.search(newVal, oldVal)
                });
        }

        search(newVal: string, oldVal: string) {
            var that = this;
            if (newVal != oldVal) {
                that.$rootScope.$emit("searchTasks", that.filter);
            }
        }
    }

    TODOAppModule.controller("MainHeaderCtrl", MainHeaderCtrl);
}  