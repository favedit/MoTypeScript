var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../ICache'], function (require, exports, ICache_1) {
    "use strict";
    var TextureCache = (function (_super) {
        __extends(TextureCache, _super);
        function TextureCache() {
            _super.apply(this, arguments);
        }
        /**
         * [_doGet description]
         * @method _doGet
         * @param  {string} key [description]
         * @return {any}        [description]
         */
        TextureCache.prototype._doGet = function (key) {
            var resault;
            (resault = this._textureByKey.get(key)) && resault.xAndRef();
            return resault;
        };
        /**
         * [_doSet description]
         * @method _doSet
         * @param  {string}        key   [description]
         * @param  {THREE.Texture} value [description]
         * @return {[type]}              [description]
         */
        TextureCache.prototype._doSet = function (key, value) {
            var _this = this;
            this._textureByKey.set(key, value);
            value.addEventListener("dispose", function () {
                _this._textureByKey.delete(key);
            });
        };
        return TextureCache;
    }(ICache_1.ICache));
    exports.TextureCache = TextureCache;
});
//# sourceMappingURL=TextureCache.js.map