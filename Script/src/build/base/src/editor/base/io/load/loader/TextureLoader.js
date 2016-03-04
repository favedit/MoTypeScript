var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../ILoader'], function (require, exports, ILoader_1) {
    "use strict";
    var TextureLoader = (function (_super) {
        __extends(TextureLoader, _super);
        function TextureLoader() {
            _super.apply(this, arguments);
        }
        return TextureLoader;
    }(ILoader_1.ILoader));
    exports.TextureLoader = TextureLoader;
});
//# sourceMappingURL=TextureLoader.js.map