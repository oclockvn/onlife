﻿/*
 * @{type}: 1 -> home, 2: mobile
 */
function Bundle(type) {
    var self = this;

    this.name = ko.observable();

    this.id = ko.observable(0);
    this.expanded = ko.observable(false);
    this.price = ko.observable(0);
    this.options = ko.observableArray([
        new BundleOption("data", [new OptionValues('7gb', 7, false), new OptionValues('10gb', 10, false)]),
        new BundleOption("topup", [new OptionValues('auto', 7, false), new OptionValues('manual', 10, false)]),
        new BundleOption("contract", [new OptionValues('12 months', 7, false), new OptionValues('monthly', 10, false)])
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
}

function BundleOption(name, options) {
    this.name = ko.observable(name || "");
    this.options = ko.observableArray(options || []);
}

function OptionValues(text, price, selected) {
    this.text = ko.observable(text || "");
    this.price = ko.observable(price || "");
    this.selected = ko.observable(selected || false);
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