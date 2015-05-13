/// <reference path="../../app.bundle.ts" />
module TODOApp {

    class NewThingCtrl{
        newThing: IThingToDo;

        $inject = ["$state"]

        constructor(private $state: ng.ui.IStateService) {
            var self = this;

            self.newThing = {
                dueDate: null,
                info: null,
                isCompleted: null
            };

            
        }

        cancelCommand() {
            var that = this;

            that.$state.go("main");
        }
    }

    TODOAppModule.controller("NewThingCtrl", NewThingCtrl);
} 