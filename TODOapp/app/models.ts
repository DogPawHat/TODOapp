/// <reference path="app.bundle.ts" />
module TODOApp {

    export interface IStatesObject {
        main: ng.ui.IState;
        newThing: ng.ui.IState;
        datePicker: ng.ui.IState;
    }

    export interface IThingToDo {
        info: string;
        dueDate: Date;
    }
}