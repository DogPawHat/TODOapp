/// <reference path="../../app.bundle.ts" />
module TODOApp {
    class MainCtrl {
        $inject = ['$localForage'];

        constructor(private $localForage: ng.localForage.ILocalForageService) {
            var self = this;

            self.activate();
        }

        activate() {
            var that = this;
            return that.$localForage.length().then((length) => {
                if (length == 0) {
                    return that.initializeDataStore();
                }
            });
        }


        initializeDataStore() {
            var that = this;
            
            var initialStore: IThingToDo[] = [
                {
                    dueDate: moment(Date.now).subtract({ days: 1 }).toDate(),
                    info: "Overdue",
                    isCompleted: false
                },
                {
                    dueDate: moment(Date.now).add({ days: 7 }).toDate(),
                    info: "On Time",
                    isCompleted: false
                },
                {
                    dueDate: moment(Date.now).subtract({ days: 1 }).toDate(),
                    info: "Completed",
                    isCompleted: true
                }
            ]; 

            var initalKeys: string[] = [];

            _.each(initialStore,(thing, index) => {
                initalKeys.push("todo-" + "in" + index.toString());
            });

            return that.$localForage.setItem(initalKeys, initialStore);
        }
    }

    TODOAppModule.controller("MainCtrl", MainCtrl);
} 