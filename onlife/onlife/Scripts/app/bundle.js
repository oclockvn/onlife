function Bundle() {
    this.name = ko.observable();

    this.price = ko.observable(0);
    this.options = ko.observableArray();
}

function BundleOption(name, options) {
    this.name = ko.observable(name || "");
    this.options = ko.observableArray(options || []);
}

function ViewModel() {
    var self = this;
    
    self.bundles = ko.observableArray();
}

(function () {
    var vm = new ViewModel();

    ko.applyBindings(vm);
})();