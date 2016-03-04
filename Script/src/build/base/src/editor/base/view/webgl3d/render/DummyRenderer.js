var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Renderer'], function (require, exports, Renderer_1) {
    "use strict";
    var DummyRenderer = (function (_super) {
        __extends(DummyRenderer, _super);
        function DummyRenderer() {
            _super.apply(this, arguments);
        }
        return DummyRenderer;
    }(Renderer_1.Renderer));
    exports.DummyRenderer = DummyRenderer;
});
//# sourceMappingURL=DummyRenderer.js.map