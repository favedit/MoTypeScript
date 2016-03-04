var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './OBJLoader'], function (require, exports, OBJLoader_1) {
    "use strict";
    var BinaryOBJLoader = (function (_super) {
        __extends(BinaryOBJLoader, _super);
        function BinaryOBJLoader() {
            _super.apply(this, arguments);
        }
        return BinaryOBJLoader;
    }(OBJLoader_1.OBJLoader));
    exports.BinaryOBJLoader = BinaryOBJLoader;
});
//# sourceMappingURL=BinaryOBJLoader.js.map