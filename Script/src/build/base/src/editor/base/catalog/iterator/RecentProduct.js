var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Product'], function (require, exports, Product_1) {
    "use strict";
    var RecentProduct = (function (_super) {
        __extends(RecentProduct, _super);
        function RecentProduct() {
            _super.apply(this, arguments);
        }
        return RecentProduct;
    }(Product_1.Product));
    exports.RecentProduct = RecentProduct;
});
//# sourceMappingURL=RecentProduct.js.map