var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Inference'], function (require, exports, Inference_1) {
    "use strict";
    var PointInference = (function (_super) {
        __extends(PointInference, _super);
        function PointInference() {
            _super.apply(this, arguments);
        }
        return PointInference;
    }(Inference_1.Inference));
    exports.PointInference = PointInference;
});
//# sourceMappingURL=PointInference.js.map