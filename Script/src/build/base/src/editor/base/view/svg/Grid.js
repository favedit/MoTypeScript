var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../base/Grid'], function (require, exports, Grid_1) {
    "use strict";
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid() {
            _super.apply(this, arguments);
        }
        return Grid;
    }(Grid_1.Grid));
    exports.Grid = Grid;
});
//# sourceMappingURL=Grid.js.map