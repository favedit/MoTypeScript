var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../CompositeCommand'], function (require, exports, CompositeCommand_1) {
    "use strict";
    exports.WallTypeEnum = {
        free: "free",
        notShared: "not_shared",
        shared: "shared"
    };
    var CmdDeleteWalls = (function (_super) {
        __extends(CmdDeleteWalls, _super);
        function CmdDeleteWalls() {
            _super.apply(this, arguments);
        }
        return CmdDeleteWalls;
    }(CompositeCommand_1.CompositeCommand));
    exports.CmdDeleteWalls = CmdDeleteWalls;
});
//# sourceMappingURL=CmdDeleteWalls.js.map