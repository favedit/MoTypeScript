var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Entity'], function (require, exports, Entity_1) {
    "use strict";
    var CoEdge = (function (_super) {
        __extends(CoEdge, _super);
        function CoEdge() {
            _super.apply(this, arguments);
        }
        return CoEdge;
    }(Entity_1.Entity));
    exports.CoEdge = CoEdge;
});
//# sourceMappingURL=CoEdge.js.map