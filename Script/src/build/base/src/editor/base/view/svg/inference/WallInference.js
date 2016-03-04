var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Inference'], function (require, exports, Inference_1) {
    "use strict";
    var WallInference = (function (_super) {
        __extends(WallInference, _super);
        function WallInference() {
            _super.apply(this, arguments);
        }
        return WallInference;
    }(Inference_1.Inference));
    exports.WallInference = WallInference;
});
//# sourceMappingURL=WallInference.js.map