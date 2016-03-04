var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../base/index'], function (require, exports, base) {
    "use strict";
    var CameraMovementController = (function (_super) {
        __extends(CameraMovementController, _super);
        function CameraMovementController() {
            _super.apply(this, arguments);
        }
        return CameraMovementController;
    }(base.DisplayController));
    exports.CameraMovementController = CameraMovementController;
});
//# sourceMappingURL=CameraMovementController.js.map