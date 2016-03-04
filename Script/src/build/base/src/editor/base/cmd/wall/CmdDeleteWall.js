var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../CompositeCommand'], function (require, exports, CompositeCommand_1) {
    "use strict";
    var CmdDeleteWall = (function (_super) {
        __extends(CmdDeleteWall, _super);
        function CmdDeleteWall() {
            _super.apply(this, arguments);
        }
        return CmdDeleteWall;
    }(CompositeCommand_1.CompositeCommand));
    exports.CmdDeleteWall = CmdDeleteWall;
});
//# sourceMappingURL=CmdDeleteWall.js.map