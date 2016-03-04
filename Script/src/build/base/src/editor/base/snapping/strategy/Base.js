define(["require", "exports"], function (require, exports) {
    "use strict";
    var Base = (function () {
        function Base(entity) {
            this.entity = entity;
            this.snapOffset = 0;
            this.autoFitEnable = !1;
        }
        Base.prototype.doSnapping = function (strategy) {
            this.snapOffset = strategy.snapOffset || this.snapOffset;
            this.autoFitEnable = strategy.autoFitEnable || this.autoFitEnable;
        };
        return Base;
    }());
    exports.Base = Base;
});
//# sourceMappingURL=Base.js.map