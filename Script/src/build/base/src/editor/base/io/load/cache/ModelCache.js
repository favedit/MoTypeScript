var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../ICache'], function (require, exports, ICache_1) {
    "use strict";
    /**
     *
     */
    var ModelCache = (function (_super) {
        __extends(ModelCache, _super);
        function ModelCache() {
            _super.apply(this, arguments);
        }
        /**
         * [_doGet description]
         * @method _doGet
         * @param  {string} key [description]
         * @return {[type]}     [description]
         */
        ModelCache.prototype._doGet = function (key) {
            var items = this._meshDataByKey.get(key);
            if (!items)
                return items;
            var resault = new THREE.Object3D;
            items.forEach(function (item) {
                item.geometry.xAddRef();
                var mesh = new THREE.Mesh(item.geometry, item.material);
                mesh.name = mesh.name;
                resault.add(mesh);
            });
            return resault;
        };
        ;
        /**
         * [_doSet description]
         * @method _doSet
         * @param  {string}     key   [description]
         * @param  {THREE.Mesh} value [description]
         * @return {[type]}           [description]
         */
        ModelCache.prototype._doSet = function (key, value) {
            var _this = this;
            var cacheObj = value.children.map(function (child) {
                return {
                    name: child.name,
                    geometry: child.geometry,
                    material: child.material
                };
            });
            this._meshDataByKey.set(key, cacheObj);
            if (cacheObj.length === 0) {
                console.log("empty model cached for: " + key);
            }
            else {
                cacheObj[0].geometry.addEventListener("dispose", function () {
                    _this._meshDataByKey.delete(key);
                });
            }
        };
        ;
        return ModelCache;
    }(ICache_1.ICache));
    exports.ModelCache = ModelCache;
});
//# sourceMappingURL=ModelCache.js.map