var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Base'], function (require, exports, Base_1) {
    "use strict";
    var Composite = (function (_super) {
        __extends(Composite, _super);
        function Composite() {
            _super.apply(this, arguments);
        }
        return Composite;
    }(Base_1.Base));
    exports.Composite = Composite;
});
//# sourceMappingURL=Composite.js.map