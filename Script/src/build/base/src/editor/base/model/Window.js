var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Opening'], function (require, exports, Opening_1) {
    "use strict";
    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            _super.apply(this, arguments);
        }
        return Window;
    }(Opening_1.Opening));
    exports.Window = Window;
});
//# sourceMappingURL=Window.js.map