var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Camera'], function (require, exports, Camera_1) {
    "use strict";
    var FirstPersonCamera = (function (_super) {
        __extends(FirstPersonCamera, _super);
        function FirstPersonCamera() {
            _super.apply(this, arguments);
        }
        return FirstPersonCamera;
    }(Camera_1.Camera));
    exports.FirstPersonCamera = FirstPersonCamera;
});
//# sourceMappingURL=FirstPersonCamera.js.map