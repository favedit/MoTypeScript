var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Command'], function (require, exports, Command_1) {
    "use strict";
    var CmdMoveUnderlay = (function (_super) {
        __extends(CmdMoveUnderlay, _super);
        function CmdMoveUnderlay() {
            _super.apply(this, arguments);
        }
        return CmdMoveUnderlay;
    }(Command_1.Command));
    exports.CmdMoveUnderlay = CmdMoveUnderlay;
});
//# sourceMappingURL=CmdMoveUnderlay.js.map