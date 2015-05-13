/// <reference path="../../app.bundle.ts" />
module TODOApp {

    class NewThingCtrl{
        newThing: IThingToDo;

        constructor() {
            var self = this;

            self.newThing = {
                dueDate: null,
                info: null,
                isCompleted: null
            };
        }
    }

    TODOAppModule.controller("NewThingCtrl", NewThingCtrl);
} 