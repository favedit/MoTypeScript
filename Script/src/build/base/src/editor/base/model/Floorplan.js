var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core/brep/Body'], function (require, exports, Body_1) {
    "use strict";
    var Floorplan = (function (_super) {
        __extends(Floorplan, _super);
        function Floorplan() {
            _super.apply(this, arguments);
        }
        return Floorplan;
    }(Body_1.Body));
    exports.Floorplan = Floorplan;
});
//# sourceMappingURL=Floorplan.js.map