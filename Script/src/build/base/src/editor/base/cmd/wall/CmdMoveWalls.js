var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Command'], function (require, exports, Command_1) {
    "use strict";
    var CmdMoveWalls = (function (_super) {
        __extends(CmdMoveWalls, _super);
        function CmdMoveWalls() {
            _super.apply(this, arguments);
        }
        return CmdMoveWalls;
    }(Command_1.Command));
    exports.CmdMoveWalls = CmdMoveWalls;
});
//# sourceMappingURL=CmdMoveWalls.js.map