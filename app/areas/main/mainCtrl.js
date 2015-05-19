/// <reference path="../../app.bundle.ts" />
var TODOApp;
(function (TODOApp) {
    var MainCtrl = (function () {
        function MainCtrl($localForage, $rootScope) {
            this.$localForage = $localForage;
            this.$rootScope = $rootScope;
            this.$inject = ['$localForage', '$rootScope'];
            var self = this;
            self.thingsToDoObject = {};
            self.thingsToDo = [];
            self.overdue = [];
            self.filter = "";
            self.activate();
        }
        MainCtrl.prototype.activate = function () {
            var that = this;
            that.$rootScope.$on("searchTasks", function (event, data) {
                that.search(event, data);
            });
            return that.refreshList();
        };
        MainCtrl.prototype.search = function (event, data) {
            var that = this;
            that.filter = data;
            that.sortedThingsToDo();
        };
        MainCtrl.prototype.sortedThingsToDo = function () {
            var that = this;
            var now = Date.now();
            var pairs;
            var sorted;
            var filtered;
            pairs = _.pairs(that.thingsToDoObject);
            sorted = _.sortBy(pairs, function (value, index, list) {
                return value[1]["dueDate"];
            });
            filtered = that.filter ? _.filter(sorted, function (s) {
                return s[1]["info"].indexOf(that.filter) != -1;
            }) : sorted;
            that.overdue = [];
            that.thingsToDo = filtered;
            that.overdue = _.map(that.thingsToDo, function (value) {
                return value[1]["dueDate"].valueOf() <= now;
            });
        };
        MainCtrl.prototype.refreshList = function () {
            var that = this;
            var newThingsToDo = {};
            return that.$localForage.iterate(function (value, key) {
                newThingsToDo[key] = value;
            }).then(function () {
                that.thingsToDoObject = newThingsToDo;
                that.sortedThingsToDo();
            });
        };
        MainCtrl.prototype.setAsDoneCommand = function (key) {
            var that = this;
            return that.$localForage.removeItem(key).then(function () {
                return that.refreshList();
            });
        };
        MainCtrl.prototype.initializeDataStore = function () {
            var that = this;
            var initialThings = [
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
            var initialKeys = [
                "todo-in1",
                "todo-in2",
                "todo-in3"
            ];
            var initalStore = {};
            _.each(initialThings, function (thing, index) {
                initalStore[initialKeys[index]] = thing;
            });
            return that.$localForage.setItem(initialKeys, initialThings);
        };
        return MainCtrl;
    })();
    TODOApp.TODOAppModule.controller("MainCtrl", MainCtrl);
})(TODOApp || (TODOApp = {}));
//# sourceMappingURL=mainCtrl.js.map