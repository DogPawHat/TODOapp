/// <reference path="../../app.bundle.ts" />
module TODOApp {
    class MainCtrl {
        $inject = ['$localForage', '$rootScope'];

        private thingsToDoObject: {
            [key: string]: IThingToDo;
        }

        thingsToDo: any[][];
        overdue: boolean[];
        filter: string;

        constructor(private $localForage: ng.localForage.ILocalForageService,
            private $rootScope: ng.IRootScopeService) {
            var self = this;

            self.thingsToDoObject = {};
            self.thingsToDo = [];
            self.overdue = [];
            self.filter = "";

            self.activate();
        }

        activate() {
            var that = this;
            that.$rootScope.$watch(
                () => { return that.filter },
                (newVal, oldVal) => {
                    that.search(newVal)
                });

            return that.refreshList();
        }

        search(data) {
            var that = this;
            that.filter = data;

            that.sortedThingsToDo();
        }

        sortedThingsToDo() {
            var that = this;
            var now = Date.now();
            var pairs;
            var sorted;
            var filtered;

            pairs = _.pairs(that.thingsToDoObject);

            sorted = _.sortBy(pairs,
                (value, index, list) => {
                    return value[1]["dueDate"];
                });

            filtered = that.filter
                ? _.filter(sorted,(s) => {
                return (<string>s[1]["info"]).indexOf(that.filter) != -1;
                })
                : sorted;

            
            that.overdue = [];
            that.thingsToDo = filtered;
            that.overdue = _.map(that.thingsToDo,(value) => {
                return value[1]["dueDate"].valueOf() <= now;
            });
        }

        refreshList() {
            var that = this;
            var newThingsToDo: { [key: string]: IThingToDo } = {};
            return that.$localForage.iterate(
                (value, key) => {
                    newThingsToDo[key] = {
                        info: (<any>value).info,
                        dueDate: moment((<any>value).dueDate).toDate()
                    };
                }).then(() => {
                    that.thingsToDoObject = newThingsToDo;
                    that.sortedThingsToDo();
            });
        }

        setAsDoneCommand(key) {
            var that = this;

            return that.$localForage.removeItem(key).then(
                () => {
                    return that.refreshList();
                });
        }

        openModal() {
            var that = this;
            that.$rootScope["modalActive"] = true;
        }

        private initializeDataStore() {
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