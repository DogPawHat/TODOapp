/// <reference path="../../app.bundle.ts" />
module TODOApp {

    class NewThingCtrl{
        newThing: IThingToDo;
        form: ng.IFormController;
        isSaving: boolean;
        datePickerOpen: boolean;

        $inject = ["$state", "$localForage"]

        constructor(private $state: ng.ui.IStateService, private $localForage: ng.localForage.ILocalForageService) {
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
                    that.$state.go("main");
                }).finally(() => {
                    that.isSaving = false;
                });
            }
        }

        cancelCommand() {
            var that = this;

            that.$state.go("main");
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