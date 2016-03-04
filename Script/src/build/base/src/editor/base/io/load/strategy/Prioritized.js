var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../IStrategy'], function (require, exports, IStrategy_1) {
    "use strict";
    var Prioritized = (function (_super) {
        __extends(Prioritized, _super);
        function Prioritized() {
            _super.apply(this, arguments);
        }
        return Prioritized;
    }(IStrategy_1.IStrategy));
    exports.Prioritized = Prioritized;
});
//# sourceMappingURL=Prioritized.js.map