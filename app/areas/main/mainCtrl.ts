/// <reference path="../../app.bundle.ts" />
module TODOApp {
    class MainCtrl {
        $inject = ['$localForage'];

        public thingsToDo: IThingToDo[];

        constructor(private $localForage: ng.localForage.ILocalForageService) {
            var self = this;

            self.thingsToDo = [];

            self.activate();
        }

        activate() {
            var that = this;
            return that.$localForage.length().then((length) => {
                if (length == 0) {
                    return that.initializeDataStore();
                }
            }).then(() => {
                return that.$localForage.keys().then((keys) => {
                    return that.$localForage.getItem(keys).then((items) => {
                        _.each(items,(i) => {
                            that.thingsToDo.push(<any>i);
                        });
                    });
                });
            });
        }


        initializeDataStore() {
            var that = this;

            var initialStore: IThingToDo[] = [
                {
                    dueDate: moment(Date.now()).add({ days: 1 }).toDate(),
                    info: "Overdue",
                    isCompleted: false
                },
                {
                    dueDate: moment(Date.now()).subtract({ days: 7 }).toDate(),
                    info: "On Time",
                    isCompleted: false
                },
                {
                    dueDate: moment(Date.now()).subtract({ days: 1 }).toDate(),
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