var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../ILoader'], function (require, exports, ILoader_1) {
    "use strict";
    var ModelLoader = (function (_super) {
        __extends(ModelLoader, _super);
        function ModelLoader() {
            _super.apply(this, arguments);
        }
        return ModelLoader;
    }(ILoader_1.ILoader));
    exports.ModelLoader = ModelLoader;
});
//# sourceMappingURL=ModelLoader.js.map