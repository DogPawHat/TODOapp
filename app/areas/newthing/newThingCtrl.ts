/// <reference path="../../app.bundle.ts" />
module TODOApp {

    class NewThingCtrl{
        newThing: IThingToDo;
        form: ng.IFormController;
        isSaving: boolean;
        datePickerOpen: boolean;

        $inject = ["$state", "$localForage", "$rootScope"]

        constructor(private $state: ng.ui.IStateService,
            private $localForage: ng.localForage.ILocalForageService,
            private $rootScope: ng.IRootScopeService) {
            var self = this;
            self.isSaving = false;
            self.datePickerOpen = false;
            self.newThing = {
                dueDate: null,
                info: null,
            };

            
        }

        addCommand() {
            var that = this;
            if (that.form.$valid) {

                that.isSaving = true;
                that.$localForage.setItem("todo-" + Date.now().toString(), that.newThing).then(() => {
                    that.$rootScope.$emit("refreshEvent");
                    that.$rootScope["modalActive"] = false;
                }).finally(() => {
                    that.isSaving = false;
                });
            }
        }

        cancelCommand() {
            var that = this;

            that.$rootScope["modalActive"] = false;
        }
        
        openDatePicker($event: MouseEvent) {
            var that = this;
            $event.preventDefault();
            $event.stopPropagation();

            that.datePickerOpen = true;
        }
    }

    TODOAppModule.controller("NewThingCtrl", NewThingCtrl);
} 