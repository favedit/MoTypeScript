define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.CursorEnum = {
        grab: "cursor:default;cursor:-moz-grab;cursor:-webkit-grab;",
        grabbing: "cursor:default;cursor:-moz-grabbing;cursor:-webkit-grabbing;",
        none: "cursor: pointer;",
        move: "cursor: move;",
        default: "cursor: default;",
        crosshair: "cursor: crosshair;",
        nsResize: "cursor: ns-resize;",
        ewResize: "cursor: ew-resize;",
        rotation: "cursor:move;cursor: url(res/view/svg/rotate_cursor.svg) 16 16, move;",
        pointer: "cursor: pointer",
        notallowed: "cursor: not-allowed"
    };
    var CursorStatus = (function () {
        function CursorStatus() {
        }
        return CursorStatus;
    }());
    exports.CursorStatus = CursorStatus;
});
//# sourceMappingURL=CursorStatus.js.map