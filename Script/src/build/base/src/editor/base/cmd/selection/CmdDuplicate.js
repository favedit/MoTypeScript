var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../CompositeCommand'], function (require, exports, CompositeCommand_1) {
    "use strict";
    var CmdDuplicate = (function (_super) {
        __extends(CmdDuplicate, _super);
        function CmdDuplicate() {
            _super.apply(this, arguments);
        }
        return CmdDuplicate;
    }(CompositeCommand_1.CompositeCommand));
    exports.CmdDuplicate = CmdDuplicate;
});
//# sourceMappingURL=CmdDuplicate.js.map