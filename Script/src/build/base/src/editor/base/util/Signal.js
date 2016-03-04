define(["require", "exports"], function (require, exports) {
    "use strict";
    var Signal = (function () {
        function Signal(target) {
            this.EVENT_TYPE = "signal";
            this.defaultTarget = null;
            //protected eventTarget = new goog.events.EventTarget
            this.eventTarget = null;
            this.defaultTarget = target;
            this.eventTarget = new goog.events.EventTarget;
        }
        Signal.prototype.listen = function (a, b, c) {
            "object" === typeof b ? (c = b, b = !1) : b = b || !1;
            return goog.events.listen(this.eventTarget, this.EVENT_TYPE, a, b, c);
        };
        Signal.prototype.unlisten = function (a, b, c) {
            "object" === typeof b ? (c = b, b = !1) : b = b || !1;
            return goog.events.unlisten(this.eventTarget, this.EVENT_TYPE, a, b, c);
        };
        Signal.prototype.unlistenByKey = function (a) {
            return goog.events.unlistenByKey(a);
        };
        Signal.prototype.Hook = function (a) {
            this._defaultListernerScope = a;
            this._evtKeys = [];
        };
        Signal.prototype.listen = function (a, b, c) {
            c = c || this._defaultListernerScope;
            a = a.listen(b, c);
            this._evtKeys.push(a);
        };
        Signal.prototype.unlistenAll = function () {
            this._evtKeys.forEach(function (a) {
                goog.events.unlistenByKey(a);
            });
            this._evtKeys.length = 0;
        };
        Signal.prototype.dispatch = function (a, b) {
            b = b || this.defaultTarget || this;
            var c = new goog.events.Event(this.EVENT_TYPE, b);
            c.data = a;
            return this.eventTarget.dispatchEvent(c);
        };
        return Signal;
    }());
    exports.Signal = Signal;
});
//# sourceMappingURL=Signal.js.map