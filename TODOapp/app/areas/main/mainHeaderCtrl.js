/// <reference path="../../app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    var MainHeaderCtrl = (function () {
        function MainHeaderCtrl($localForage, $rootScope) {
            this.$localForage = $localForage;
            this.$rootScope = $rootScope;
            this.$inject = ['$rootScope'];
            var self = this;
            self.filter = "";
            self.activate();
        }
        MainHeaderCtrl.prototype.activate = function () {
            var that = this;
            that.$rootScope.$watch(function () {
                return that.filter;
            }, function (newVal, oldVal) {
                that.search(newVal, oldVal);
            });
        };
        MainHeaderCtrl.prototype.search = function (newVal, oldVal) {
            var that = this;
            if (newVal != oldVal) {
                that.$rootScope.$emit("searchTasks", that.filter);
            }
        };
        return MainHeaderCtrl;
    })();
    TODOApp.TODOAppModule.controller("MainHeaderCtrl", MainHeaderCtrl);
})(TODOApp || (TODOApp = {}));
//# sourceMappingURL=mainHeaderCtrl.js.map