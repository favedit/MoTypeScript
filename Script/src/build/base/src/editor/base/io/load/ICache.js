define(["require", "exports", "../../util/Url"], function (require, exports, Url) {
    "use strict";
    var ICache = (function () {
        function ICache() {
        }
        /**
         * [get description]
         * @method get
         * @param  {string}      urlPath  [description]
         * @param  {CacheHelper} cacheObj [description]
         * @return {string}               [description]
         */
        ICache.prototype.get = function (key, cacheObj) {
            var cacheKey = this._getCacheKey(key, cacheObj);
            return cacheKey ? this._doGet(cacheKey) : null;
        };
        ;
        /**
         * [urlPath description]
         * @type {string}
         */
        ICache.prototype.set = function (key, value, cacheObj) {
            (key = this._getCacheKey(key, cacheObj)) && this._doSet(key, value);
        };
        ;
        /**
         * [urlPath description]
         * @type {string}
         */
        ICache.prototype._doSet = function (key, value) {
            console.log("not implemented");
        };
        ;
        /**
         * [_doGet description]
         * @method _doGet
         * @param  {string} urlPath [description]
         * @return {any}            [description]
         */
        ICache.prototype._doGet = function (key) {
            console.log("not implemented");
        };
        ;
        /**
         * [_getCacheKey description]
         * @method _getCacheKey
         * @param  {string}      urlPath  [description]
         * @param  {CacheHelper} cacheObj [description]
         * @return {string}               [description]
         */
        ICache.prototype._getCacheKey = function (key, cacheObj) {
            return cacheObj.cacheKey ? cacheObj.cacheKey : key && Url.isDataUrl(key) ? null : key;
        };
        return ICache;
    }());
    exports.ICache = ICache;
});
//# sourceMappingURL=ICache.js.map