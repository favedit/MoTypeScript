var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './MoveWall'], function (require, exports, MoveWall_1) {
    "use strict";
    var MoveWalls = (function (_super) {
        __extends(MoveWalls, _super);
        function MoveWalls() {
            _super.apply(this, arguments);
        }
        return MoveWalls;
    }(MoveWall_1.MoveWall));
    exports.MoveWalls = MoveWalls;
});
//# sourceMappingURL=MoveWalls.js.map