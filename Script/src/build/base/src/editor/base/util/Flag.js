define(["require", "exports"], function (require, exports) {
    "use strict";
    var Flag = (function () {
        function Flag() {
        }
        Flag.prototype.isFlagOn = function (a, b) {
            return 0 !== (a & b);
        };
        Flag.prototype.isFlagOff = function (a, b) {
            return 0 === (a & b);
        };
        Flag.prototype.setFlagOn = function (a, b) {
            return a | b;
        };
        Flag.prototype.setFlagOff = function (a, b) {
            return a & ~b;
        };
        return Flag;
    }());
    exports.Flag = Flag;
});
//# sourceMappingURL=Flag.js.map