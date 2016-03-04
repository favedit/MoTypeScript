var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Base', '../io/ResourceManager', '../catalog/meta/Manager', '../material/Manager'], function (require, exports, Base_1, ResourceManager_1, Manager_1, Manager_2) {
    "use strict";
    var Product = (function (_super) {
        __extends(Product, _super);
        function Product() {
            _super.call(this);
            this.resourceManager = ResourceManager_1.ResourceManager.getInstance();
            this.catalogManager = Manager_1.Manager.instance();
            this.materialManager = Manager_2.Manager.instance();
        }
        return Product;
    }(Base_1.Base));
    exports.Product = Product;
});
//# sourceMappingURL=Product.js.map