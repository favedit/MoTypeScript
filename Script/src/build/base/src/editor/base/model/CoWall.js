var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core/brep/CoEdge'], function (require, exports, CoEdge_1) {
    "use strict";
    var CoWall = (function (_super) {
        __extends(CoWall, _super);
        function CoWall() {
            _super.apply(this, arguments);
        }
        return CoWall;
    }(CoEdge_1.CoEdge));
    exports.CoWall = CoWall;
});
//# sourceMappingURL=CoWall.js.map