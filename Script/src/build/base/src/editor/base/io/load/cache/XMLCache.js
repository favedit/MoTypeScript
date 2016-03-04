var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../ICache'], function (require, exports, ICache_1) {
    "use strict";
    var XMLCache = (function (_super) {
        __extends(XMLCache, _super);
        function XMLCache() {
            _super.apply(this, arguments);
        }
        /**
         * [_doGet description]
         * @method _doGet
         * @param  {string} key [description]
         * @return {[type]}     [description]
         */
        XMLCache.prototype._doGet = function (key) {
            this._xmlByKey.get(key);
        };
        /**
         * [_doSet description]
         * @method _doSet
         * @param  {string}        key         [description]
         * @param  {SVGSVGElement} XMLDocument [description]
         * @return {[type]}                    [description]
         */
        XMLCache.prototype._doSet = function (key, xmlDocument) {
            this._xmlByKey.set(key, xmlDocument);
        };
        return XMLCache;
    }(ICache_1.ICache));
    exports.XMLCache = XMLCache;
});
//# sourceMappingURL=XMLCache.js.map