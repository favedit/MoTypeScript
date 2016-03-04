var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Camera'], function (require, exports, Camera_1) {
    "use strict";
    var AerialViewCamera = (function (_super) {
        __extends(AerialViewCamera, _super);
        function AerialViewCamera() {
            _super.apply(this, arguments);
        }
        return AerialViewCamera;
    }(Camera_1.Camera));
    exports.AerialViewCamera = AerialViewCamera;
});
//# sourceMappingURL=AerialViewCamera.js.map