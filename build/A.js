define(["require", "exports", './B'], function (require, exports, B_1) {
    "use strict";
    var A = (function () {
        function A() {
        }
        A.prototype.test = function () {
            return new B_1.B();
        };
        return A;
    }());
    exports.A = A;
});
