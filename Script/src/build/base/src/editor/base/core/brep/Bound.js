var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Rect = (function () {
        function Rect() {
        }
        return Rect;
    }());
    exports.Rect = Rect;
    var Bound = (function (_super) {
        __extends(Bound, _super);
        function Bound() {
            _super.apply(this, arguments);
        }
        return Bound;
    }(Rect));
    exports.Bound = Bound;
});
//# sourceMappingURL=Bound.js.map