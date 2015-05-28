/// <reference path="../../app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    var NewThingCtrl = (function () {
        function NewThingCtrl($state, $localForage, $rootScope) {
            this.$state = $state;
            this.$localForage = $localForage;
            this.$rootScope = $rootScope;
            this.$inject = ["$state", "$localForage", "$rootScope"];
            var self = this;
            self.isSaving = false;
            self.datePickerOpen = false;
            self.newThing = {
                dueDate: moment().toDate(),
                info: null
            };
        }
        NewThingCtrl.prototype.addCommand = function () {
            var that = this;
            if (that.form.$valid) {
                that.isSaving = true;
                that.$localForage.setItem("todo-" + Date.now().toString(), that.newThing).then(function () {
                    that.$rootScope.$emit("refreshEvent");
                    that.$rootScope["modalActive"] = false;
                }).finally(function () {
                    that.isSaving = false;
                });
            }
        };
        NewThingCtrl.prototype.cancelCommand = function () {
            var that = this;
            that.$rootScope["modalActive"] = false;
        };
        NewThingCtrl.prototype.openDatePicker = function ($event) {
            var that = this;
            $event.preventDefault();
            $event.stopPropagation();
            that.datePickerOpen = true;
        };
        return NewThingCtrl;
    })();
    TODOApp.TODOAppModule.controller("NewThingCtrl", NewThingCtrl);
})(TODOApp || (TODOApp = {}));
//# sourceMappingURL=newThingCtrl.js.map