var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Display'], function (require, exports, Display_1) {
    "use strict";
    var WallGeometry = (function () {
        function WallGeometry() {
        }
        return WallGeometry;
    }());
    exports.WallGeometry = WallGeometry;
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall() {
            _super.apply(this, arguments);
        }
        return Wall;
    }(Display_1.Display));
    exports.Wall = Wall;
});
//# sourceMappingURL=Wall.js.map