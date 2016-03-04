var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Layer'], function (require, exports, Layer_1) {
    "use strict";
    var FloatingLayer = (function (_super) {
        __extends(FloatingLayer, _super);
        function FloatingLayer() {
            _super.apply(this, arguments);
        }
        return FloatingLayer;
    }(Layer_1.Layer));
    exports.FloatingLayer = FloatingLayer;
});
//# sourceMappingURL=FloatingLayer.js.map