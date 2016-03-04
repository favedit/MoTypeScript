var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Composite'], function (require, exports, Composite_1) {
    "use strict";
    var Some = (function (_super) {
        __extends(Some, _super);
        function Some() {
            _super.apply(this, arguments);
        }
        return Some;
    }(Composite_1.Composite));
    exports.Some = Some;
});
//# sourceMappingURL=Some.js.map