var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Command'], function (require, exports, Command_1) {
    "use strict";
    var CmdMoveCamera3D = (function (_super) {
        __extends(CmdMoveCamera3D, _super);
        function CmdMoveCamera3D() {
            _super.apply(this, arguments);
        }
        return CmdMoveCamera3D;
    }(Command_1.Command));
    exports.CmdMoveCamera3D = CmdMoveCamera3D;
});
//# sourceMappingURL=CmdMoveCamera3D.js.map