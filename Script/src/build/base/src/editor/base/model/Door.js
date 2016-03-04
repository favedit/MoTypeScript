var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Opening'], function (require, exports, Opening_1) {
    "use strict";
    var Door = (function (_super) {
        __extends(Door, _super);
        function Door() {
            _super.apply(this, arguments);
        }
        return Door;
    }(Opening_1.Opening));
    exports.Door = Door;
});
//# sourceMappingURL=Door.js.map