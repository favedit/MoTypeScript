var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Command'], function (require, exports, Command_1) {
    "use strict";
    var CmdCreateRectRoom = (function (_super) {
        __extends(CmdCreateRectRoom, _super);
        function CmdCreateRectRoom() {
            _super.apply(this, arguments);
        }
        return CmdCreateRectRoom;
    }(Command_1.Command));
    exports.CmdCreateRectRoom = CmdCreateRectRoom;
});
//# sourceMappingURL=CmdCreateRectRoom.js.map