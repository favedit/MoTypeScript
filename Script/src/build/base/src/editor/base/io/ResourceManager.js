define(["require", "exports"], function (require, exports) {
    "use strict";
    var ResourceManager = (function () {
        function ResourceManager() {
        }
        ResourceManager.getInstance = function () {
            return new ResourceManager();
        };
        return ResourceManager;
    }());
    exports.ResourceManager = ResourceManager;
});
//# sourceMappingURL=ResourceManager.js.map