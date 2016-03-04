var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Renderer'], function (require, exports, Renderer_1) {
    "use strict";
    var CompositeRenderer = (function (_super) {
        __extends(CompositeRenderer, _super);
        function CompositeRenderer() {
            _super.apply(this, arguments);
        }
        return CompositeRenderer;
    }(Renderer_1.Renderer));
    exports.CompositeRenderer = CompositeRenderer;
});
//# sourceMappingURL=CompositeRenderer.js.map