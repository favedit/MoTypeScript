var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Display'], function (require, exports, Display_1) {
    "use strict";
    var Gizmo = (function (_super) {
        __extends(Gizmo, _super);
        function Gizmo() {
            _super.apply(this, arguments);
        }
        return Gizmo;
    }(Display_1.Display));
    exports.Gizmo = Gizmo;
});
//# sourceMappingURL=Gizmo.js.map