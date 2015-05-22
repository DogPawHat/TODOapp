/// <reference path="../../app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    var NewThingCtrl = (function () {
        function NewThingCtrl($state, $localForage) {
            this.$state = $state;
            this.$localForage = $localForage;
            this.$inject = ["$state", "$localForage"];
            var self = this;
            self.isSaving = false;
            self.datePickerOpen = false;
            self.newThing = {
                dueDate: null,
                info: null,
            };
        }
        NewThingCtrl.prototype.addCommand = function () {
            var that = this;
            if (that.form.$valid) {
                that.isSaving = true;
                that.$localForage.setItem("todo-" + Date.now().toString(), that.newThing).then(function () {
                    that.$state.go("main");
                }).finally(function () {
                    that.isSaving = false;
                });
            }
        };
        NewThingCtrl.prototype.cancelCommand = function () {
            var that = this;
            that.$state.go("main");
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