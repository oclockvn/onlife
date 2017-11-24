/*
 * @{type}: 1 -> home, 2: mobile
 */
function Bundle(type) {
    var self = this;

    this.name = ko.observable();

    this.id = ko.observable(0);
    this.expanded = ko.observable(false);
    this.price = ko.observable(0);
    this.options = ko.observableArray();
    this.type = ko.observable(type || 2); // default is mobile

    this.create = function () {
        self.id(Number(_.uniqueId()));

        console.log("bundle %i is created", self.id());
    };
}

function BundleOption(name, options) {
    this.name = ko.observable(name || "");
    this.options = ko.observableArray(options || []);
}

function ViewModel() {
    var self = this;

    self.bundles = ko.observableArray([new Bundle(), new Bundle()]);

    self.toggleBundle = function (bundle) {
        bundle.expanded(!bundle.expanded());
    };

    self.removeBundle = function (bundle) {

        self.bundles.remove(bundle);

        if (self.bundles().length < 2) {

            // todo: check type of bundle
            self.bundles.push(new Bundle());
        }
    };

    self.addBundle = function () {
        var b = new Bundle(2); // add mobile bundle
        b.create();

        self.bundles.push(b);
    };
}

(function () {
    var vm = new ViewModel();

    ko.applyBindings(vm);
})();