define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.ContextOffsetFromBody = function () {
    };
    exports.TransformPoint = function () {
        var a = [0, 0], b = [0, 0];
        return function (c, d, e) {
            b[0] = d[2] / c[2];
            b[1] = d[3] / c[3];
            a = [e[0] - c[0], e[1] - c[1]];
            return [a[0] * b[0] + d[0], a[1] * b[1] + d[1]];
        };
    }();
    exports.TransformVector = function () {
        var a = [0, 0];
        return function (b, c, d) {
            a[0] = c[2] / b[2];
            a[1] = c[3] / b[3];
            return [d[0] * a[0], d[1] * a[1]];
        };
    }();
    exports.ModelLengthToScreenLength = function (a) {
    };
    exports.CanvasLengthToScreenLength = function (a) {
    };
    exports.ScreenPointToCanvas = function (a, b) {
    };
    exports.ScreenVectorToCanvas = function (a, b) {
    };
});
//TODO
//# sourceMappingURL=index.js.map