/*
 * @{type}: 1 -> home, 2: mobile
 */
function Bundle(type) {
    var self = this;

    type = type || 2;
    var name = type == 1 ? "home data" : "mobile data";

    this.name = ko.observable(name);

    this.id = ko.observable(0);
    this.expanded = ko.observable(false);
    this.price = ko.observable(0);
    this.options = ko.observableArray([
        new BundleOption("data", "purple-mobile-data.png", [new OptionValues('7gb', 7, "7gb data", false), new OptionValues('10gb', 10, "10 gb data", false)]),
        new BundleOption("topup", "dollar.png", [new OptionValues('auto', 7, null, false), new OptionValues('manual', 10, "50mbps", false)]),
        new BundleOption("contract", "contract.png", [new OptionValues('12 months', 7, "12 months contract", false), new OptionValues('monthly', 10, "monthly contract", false)])
    ]);
    this.type = ko.observable(type || 2); // default is mobile
    this.includeMobileTalk = ko.observable(false);

    this.create = function () {
        self.id(Number(_.uniqueId()));

        console.log("bundle %i is created", self.id());
    };

    this.toggleMobileTalk = function () {
        self.includeMobileTalk(!self.includeMobileTalk());

        console.log("bundle %s include mobile talk: %o", self.id(), self.includeMobileTalk());
    };

    this.selectedOptions = ko.pureComputed(function () {
        var arr = [];

        if (self.includeMobileTalk()) {
            arr.push("Local, national & mobile talk");
        }

        _.forEach(self.options(), function (op) {
            var selected = _.find(op.options(), function (o) {
                return o.selected();
            });

            if (!!selected && selected.description()) {
                arr.push(selected.description);
            }
        });
        
        return arr;
    }, self);
}

function BundleOption(name, icon, options) {

    var self = this;

    icon = icon || "";
    icon = "/Content/images/" + icon;
    this.name = ko.observable(name || "");
    this.icon = ko.observable(icon);
    this.options = ko.observableArray(options || []);
    this.id = Number(_.uniqueId());

    this.dataClass = ko.pureComputed(function () {
        return "data--" + this.name();
    }, this);

    this.selectOption = function (option) {

        _.forEach(self.options(), function (op) {
            op.selected(false);
        });

        option.selected(true);
    };
}

function OptionValues(text, price, desc, selected) {
    this.id = Number(_.uniqueId());
    this.text = ko.observable(text || "");
    this.price = ko.observable(price || "");
    this.selected = ko.observable(selected || false);
    this.description = ko.observable(desc || "");
}

function ViewModel() {
    var self = this;

    self.bundles = ko.observableArray([new Bundle(1), new Bundle(2)]);

    self.toggleBundle = function (bundle) {
        bundle.expanded(!bundle.expanded());
    };

    self.removeBundle = function (bundle) {

        self.bundles.remove(bundle);

        // find a home bundle
        var home = _.find(self.bundles(), function (b) {
            return b.type() === 1;
        });

        // if there is no home bundle, add new one
        if (!home) {
            self.bundles.unshift(new Bundle(1));
        }

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
    vm.realBundles = ko.pureComputed(function () {
        var arr = [];

        _.forEach(vm.bundles(), function (b) {
            if (b.id() > 0) {
                arr.push(b);
            }
        });

        return ko.observableArray(arr);
    }, vm);

    ko.applyBindings(vm);
})();