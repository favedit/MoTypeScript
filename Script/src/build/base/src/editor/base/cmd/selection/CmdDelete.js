var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../CompositeCommand'], function (require, exports, CompositeCommand_1) {
    "use strict";
    var CmdDelete = (function (_super) {
        __extends(CmdDelete, _super);
        function CmdDelete() {
            _super.apply(this, arguments);
        }
        return CmdDelete;
    }(CompositeCommand_1.CompositeCommand));
    exports.CmdDelete = CmdDelete;
});
//# sourceMappingURL=CmdDelete.js.map