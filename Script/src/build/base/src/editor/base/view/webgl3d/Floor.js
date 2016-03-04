var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../base/index'], function (require, exports, base) {
    "use strict";
    exports.RoomResourceLoadingTaskEnum = {
        ceilingMaterial: "ceilingmaterial",
        floorMaterial: "floormaterial"
    };
    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor() {
            _super.apply(this, arguments);
        }
        return Floor;
    }(base.Floor));
    exports.Floor = Floor;
});
//# sourceMappingURL=Floor.js.map