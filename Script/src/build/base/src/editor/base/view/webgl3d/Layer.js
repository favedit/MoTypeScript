var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../core/EventTarget'], function (require, exports, EventTarget_1) {
    "use strict";
    exports.LayerEventEnum = {
        childAdded: "childadded",
        childRemoved: "childremoved"
    };
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            _super.apply(this, arguments);
        }
        return Layer;
    }(EventTarget_1.EventTarget));
    exports.Layer = Layer;
});
//# sourceMappingURL=Layer.js.map