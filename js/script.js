(function() {
    (function(i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }
        ,
        i[r].l = 1 * new Date;
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    }
    )(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
    ga("create", "UA-50529604-1", "auto");
    ga("send", "pageview");
    Teabot = function() {
        if (!Function.prototype.bind || !Element.prototype.addEventListener)
            return;
        this.bot_ = document.getElementById("teabot");
        this.cup_ = document.getElementById("teacup");
        this.offset_ = null;
        this.tilt_ = 0;
        this.bot_.addEventListener("click", this.pour_.bind(this, Teabot.MAX, true));
        if (!window.DeviceOrientationEvent)
            return;
        window.addEventListener("deviceorientation", this.tip_.bind(this));
        window.addEventListener("onorientationchange"in window && "orientationchange" || "resize", this.reset_.bind(this), false)
    }
    ;
    Teabot.MAX = -30;
    Teabot.MIN = 10;
    Teabot.STEP = 5;
    Teabot.WAIT = 5E3;
    Teabot.prototype.tip_ = function(e) {
        if (e.gamma === null)
            return;
        var tilt = Math.round(e.gamma / Teabot.STEP) * Teabot.STEP;
        if (this.offset_ === null)
            this.offset_ = tilt;
        tilt -= this.offset_;
        if (this.tilt_ == tilt)
            return;
        this.tilt_ = tilt;
        this.pour_(tilt)
    }
    ;
    Teabot.prototype.pour_ = function(tilt, opt_stop) {
        var tilt = Math.min(Math.max(tilt, Teabot.MAX), Teabot.MIN);
        var classNames = [];
        if (tilt < -Teabot.STEP)
            classNames.push("tip");
        if (tilt == Teabot.MAX)
            classNames.push("pour");
        this.bot_.className = classNames.join(" ");
        var s = this.bot_.style;
        s.transform = s.MozTransform = s.msTransform = s.webkitTransform = "rotate(" + tilt + "deg)";
        if (opt_stop)
            window.setTimeout(this.stop_.bind(this), Teabot.WAIT);
        if (window["ga"])
            window["ga"]("send", "event", "teabot", "pour", "tilt", tilt)
    }
    ;
    Teabot.prototype.stop_ = function() {
        this.pour_(0)
    }
    ;
    Teabot.prototype.reset_ = function() {
        this.offset_ = null;
        this.tilt_ = 0;
        this.stop_()
    }
    ;
    new Teabot;
}
)();
