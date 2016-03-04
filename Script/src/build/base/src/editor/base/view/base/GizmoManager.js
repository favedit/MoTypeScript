var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../core/EventTarget'], function (require, exports, EventTarget_1) {
    "use strict";
    var GizmoManager = (function (_super) {
        __extends(GizmoManager, _super);
        function GizmoManager() {
            _super.apply(this, arguments);
        }
        return GizmoManager;
    }(EventTarget_1.EventTarget));
    exports.GizmoManager = GizmoManager;
});
//# sourceMappingURL=GizmoManager.js.map