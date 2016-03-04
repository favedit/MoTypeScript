var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core/brep/Loop'], function (require, exports, Loop_1) {
    "use strict";
    var Room = (function (_super) {
        __extends(Room, _super);
        function Room() {
            _super.apply(this, arguments);
        }
        return Room;
    }(Loop_1.Loop));
    exports.Room = Room;
});
//# sourceMappingURL=Room.js.map