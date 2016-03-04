define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.ClipType = {
        union: 0,
        diff: 1,
        inter: 2,
        xor: 3
    };
    exports.PolyFillType = {
        evenOdd: 0,
        nonZero: 1,
        positive: 2,
        negative: 3
    };
    exports.JoinType = {
        miter: 0,
        square: 1,
        round: 2
    };
    exports.EndType = {
        openSquare: 0,
        openRound: 1,
        openButt: 2,
        closedLine: 3,
        closedPolygon: 4
    };
    exports.AABBIntersect = function () {
        var a = function (a, c) {
            var d = a.clone();
            d.left -= c;
            d.top -= c;
            d.width += 2 * c;
            d.height += 2 * c;
            return d;
        };
        return function (b, c, d) {
        };
    }();
    exports.OutlineIntersect = function (a, b, c) {
    };
    exports.ClipPolygon = function (a, b, c) {
    };
    exports.OffsetPolygon = function (a, b, c) {
    };
    exports.SimplifyPolygons = function (a) {
    };
    exports.Orientation = function (a) {
    };
});
//# sourceMappingURL=index.js.map