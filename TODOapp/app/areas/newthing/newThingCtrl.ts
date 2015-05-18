/// <reference path="../../app.bundle.ts" />
module TODOApp {

    class NewThingCtrl{
        newThing: IThingToDo;
        form: ng.IFormController;
        isSaving: boolean;

        $inject = ["$state", "$localForage"]

        constructor(private $state: ng.ui.IStateService, private $localForage: ng.localForage.ILocalForageService) {
            var self = this;
            self.isSaving = true;
            self.newThing = {
                dueDate: null,
                info: null,
                isCompleted: false
            };

            
        }

        addCommand() {
            var that = this;
            if (that.form.$valid) {
                that.$localForage.setItem("todo-" + Date.now().toString(), that.newThing).then(() => {
                    that.$state.go("main");
                });
            }
        }

        cancelCommand() {
            var that = this;

            that.$state.go("main");
        }
    }

    TODOAppModule.controller("NewThingCtrl", NewThingCtrl);
} 