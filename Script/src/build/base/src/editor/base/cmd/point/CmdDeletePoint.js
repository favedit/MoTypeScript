var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Command'], function (require, exports, Command_1) {
    "use strict";
    var CmdDeletePoint = (function (_super) {
        __extends(CmdDeletePoint, _super);
        function CmdDeletePoint() {
            _super.apply(this, arguments);
        }
        return CmdDeletePoint;
    }(Command_1.Command));
    exports.CmdDeletePoint = CmdDeletePoint;
});
//# sourceMappingURL=CmdDeletePoint.js.map