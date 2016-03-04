define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.ModelSpaceToViewSpace = function (a) {
        return Array.isArray(a) ? [a[0], a[2], -a[1]] : {
            x: a.x,
            y: a.z,
            z: -a.y
        };
    };
    exports.ViewSpaceToModelSpace = function (a) {
        return Array.isArray(a) ? [a[0], -a[2], a[1]] : {
            x: a.x,
            y: -a.z,
            z: a.y
        };
    };
});
//# sourceMappingURL=Util.js.map