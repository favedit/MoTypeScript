var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Command'], function (require, exports, Command_1) {
    "use strict";
    var CmdAddContent = (function (_super) {
        __extends(CmdAddContent, _super);
        function CmdAddContent() {
            _super.apply(this, arguments);
        }
        CmdAddContent.prototype.onExecute = function () {
        };
        /*
      
        */
        CmdAddContent.prototype.onReceive = function (a, b, c) {
        };
        return CmdAddContent;
    }(Command_1.Command));
    exports.CmdAddContent = CmdAddContent;
});
//# sourceMappingURL=CmdAddContent.js.map