define(["require", "exports"], function (require, exports) {
    "use strict";
    var Manager = (function () {
        function Manager() {
        }
        Manager.instance = function () {
            return new Manager();
        };
        return Manager;
    }());
    exports.Manager = Manager;
});
//# sourceMappingURL=Manager.js.map