var app = app || {

    _init: function () {
        this._mobileMenuButton();
    },

    _mobileMenuButton: function () {
        $(".header").on("click", ".hamburger", function (e) {
            e.preventDefault();

            var $nav = $(this).closest(".header").find(".nav");
            $nav.removeClass("flex-mobile");

            $nav.slideToggle(250, function () {
                if ($nav.css("display") === "none") {
                    $nav.removeAttr("style");
                } else {
                    $nav.addClass("flex-mobile");
                }
            });
        });
    }
};

$(document).ready(function () {
    app._init();

    $(".summary-container").slimScroll({
        height: '400px',
        size: '5px',
        color: '#313994',
        alwaysVisible: true,
        railVisible: false,
        railColor: '#111',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
    });
});