var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Product'], function (require, exports, Product_1) {
    "use strict";
    var SearchProduct = (function (_super) {
        __extends(SearchProduct, _super);
        function SearchProduct() {
            _super.apply(this, arguments);
        }
        return SearchProduct;
    }(Product_1.Product));
    exports.SearchProduct = SearchProduct;
});
//# sourceMappingURL=SearchProduct.js.map