/// <reference path="../../app.bundle.ts" />
module TODOApp {
    class MainCtrl {
        $inject = ['$localForage'];

        private thingsToDoObject: {
            [key: string]: IThingToDo;
        }

        thingsToDo: any[][];
        overdue: boolean[];

        constructor(private $localForage: ng.localForage.ILocalForageService) {
            var self = this;

            self.thingsToDoObject = {};
            self.thingsToDo = [];
            self.overdue = [];

            self.activate();
        }

        activate() {
            var that = this;
            return that.$localForage.length().then((length) => {
                if (length == 0) {
                    return that.initializeDataStore();
                }
            }).then(() => {
                    return that.refreshList();
            });
        }

        sortedThingsToDo() {
            var that = this;

            var result = _.pairs(that.thingsToDoObject);

            return _.sortBy(result,(value, index, list) => {
                return value[1]["dueDate"];
            });
        }

        refreshList() {
            var that = this;
            var newThingsToDo: { [key: string]: IThingToDo } = {};
            return that.$localForage.iterate(
                (value, key) => {
                    newThingsToDo[key] = <any>value;
                }).then(() => {
                    var now = Date.now();
                    that.thingsToDoObject = newThingsToDo;
                    that.overdue = [];
                    that.thingsToDo = that.sortedThingsToDo();
                    that.overdue = _.map(that.thingsToDo,(value) => {
                        return value[1]["dueDate"].valueOf() <= now;
                    });
            });
        }

        deleteCommand(key) {
            var that = this;

            return that.$localForage.removeItem(key).then(
                () => {
                    return that.refreshList();
                });
        }

        initializeDataStore() {
            var that = this;

            var initialThings: IThingToDo[] = [
                {
                    dueDate: moment(Date.now()).subtract({ days: 1 }).toDate(),
                    info: "Overdue",
                    isCompleted: false
                },
                {
                    dueDate: moment(Date.now()).add({ days: 7 }).toDate(),
                    info: "On Time",
                    isCompleted: false
                },
                {
                    dueDate: moment(Date.now()).toDate(),
                    info: "Completed",
                    isCompleted: true
                }
            ];

            var initialKeys: string[] = [
                "todo-in1",
                "todo-in2",
                "todo-in3"
            ];

            var initalStore: { [key: string]: IThingToDo } = {};

            _.each(initialThings,(thing, index) => {
                initalStore[initialKeys[index]] = thing;
            });

            return that.$localForage.setItem(initialKeys, initialThings);
        }
    }

    TODOAppModule.controller("MainCtrl", MainCtrl);
} 