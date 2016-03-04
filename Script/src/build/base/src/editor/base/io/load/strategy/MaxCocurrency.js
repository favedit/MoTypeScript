var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../IStrategy'], function (require, exports, IStrategy_1) {
    "use strict";
    var MaxCocurrency = (function (_super) {
        __extends(MaxCocurrency, _super);
        function MaxCocurrency() {
            _super.apply(this, arguments);
        }
        return MaxCocurrency;
    }(IStrategy_1.IStrategy));
    exports.MaxCocurrency = MaxCocurrency;
});
//# sourceMappingURL=MaxCocurrency.js.map