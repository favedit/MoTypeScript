var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../ILoader'], function (require, exports, ILoader_1) {
    "use strict";
    // TODO: 移除ILoaderHelper
    // FIXME: 替换ILoaderHelper
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader() {
            _super.apply(this, arguments);
        }
        ImageLoader.prototype.load = function (url, object) {
            var loadObject = object || {};
        };
        return ImageLoader;
    }(ILoader_1.ILoader));
    exports.ImageLoader = ImageLoader;
});
//# sourceMappingURL=ImageLoader.js.map