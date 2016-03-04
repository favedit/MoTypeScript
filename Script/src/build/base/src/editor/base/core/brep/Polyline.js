var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Entity'], function (require, exports, Entity_1) {
    "use strict";
    var Polyline = (function (_super) {
        __extends(Polyline, _super);
        function Polyline() {
            _super.apply(this, arguments);
        }
        return Polyline;
    }(Entity_1.Entity));
    exports.Polyline = Polyline;
});
//# sourceMappingURL=Polyline.js.map