var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core/brep/Entity'], function (require, exports, Entity_1) {
    "use strict";
    var Material = (function (_super) {
        __extends(Material, _super);
        function Material() {
            _super.apply(this, arguments);
        }
        return Material;
    }(Entity_1.Entity));
    exports.Material = Material;
});
//# sourceMappingURL=Material.js.map