var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './DisplayController'], function (require, exports, DisplayController_1) {
    "use strict";
    var ContentController = (function (_super) {
        __extends(ContentController, _super);
        function ContentController() {
            _super.apply(this, arguments);
        }
        return ContentController;
    }(DisplayController_1.DisplayController));
    exports.ContentController = ContentController;
});
//# sourceMappingURL=ContentController.js.map