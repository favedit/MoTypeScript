var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../base/index'], function (require, exports, base) {
    "use strict";
    exports.WallResourceLoadingTaskNames = new Map();
    "inner outer top bottom from to outerfrom outerto".split(" ").forEach(function (a) {
        exports.WallResourceLoadingTaskNames.set(a, a + "material");
    });
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall() {
            _super.apply(this, arguments);
        }
        return Wall;
    }(base.Wall));
    exports.Wall = Wall;
});
//# sourceMappingURL=Wall.js.map