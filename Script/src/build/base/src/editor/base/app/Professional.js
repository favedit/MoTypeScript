var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Product', '../util/KeyboardManager', './setting/Hotkey', './setting/AutoSaver'], function (require, exports, Product_1, KeyboardManager_1, Hotkey_1, AutoSaver_1) {
    "use strict";
    var Professional = (function (_super) {
        __extends(Professional, _super);
        function Professional() {
            _super.apply(this, arguments);
            this.keyboardManager = new KeyboardManager_1.KeyboardManager();
            this.hotkey = new Hotkey_1.Hotkey();
            this.autoSaver = new AutoSaver_1.AutoSaver();
        }
        return Professional;
    }(Product_1.Product));
    exports.Professional = Professional;
});
//# sourceMappingURL=Professional.js.map