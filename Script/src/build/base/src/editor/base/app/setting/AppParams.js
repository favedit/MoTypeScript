define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.ModeTypeEnum = {
        normal: "normal",
        iframe: "iframe",
        readonly: "readonly"
    };
    var AppParams = (function () {
        function AppParams() {
            this.debug = false;
        }
        return AppParams;
    }());
    exports.AppParams = AppParams;
});
//# sourceMappingURL=AppParams.js.map