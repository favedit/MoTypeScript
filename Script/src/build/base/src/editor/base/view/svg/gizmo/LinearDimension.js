var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../base/index'], function (require, exports, base) {
    "use strict";
    exports.LinearDimensionController = {};
    exports.LinearDimensionStateEnum = {
        disabled: 2,
        editable: 4,
        focus: 8,
        invalid: 16
    };
    exports.LinearDimensionCommitTypeEnum = {
        enter: "enter",
        click: "click"
    };
    var LinearDimension = (function (_super) {
        __extends(LinearDimension, _super);
        function LinearDimension() {
            _super.apply(this, arguments);
        }
        return LinearDimension;
    }(base.Gizmo));
    exports.LinearDimension = LinearDimension;
});
//# sourceMappingURL=LinearDimension.js.map