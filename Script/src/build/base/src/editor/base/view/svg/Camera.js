var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../base/Camera'], function (require, exports, Camera_1) {
    "use strict";
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            _super.apply(this, arguments);
        }
        return Camera;
    }(Camera_1.Camera));
    exports.Camera = Camera;
});
//# sourceMappingURL=Camera.js.map