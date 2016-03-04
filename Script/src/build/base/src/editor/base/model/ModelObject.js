define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * @return {undefined}
     */
    var ModelObject = (function () {
        function ModelObject() {
            //hsw.core.Id(this);
            this.parents = {};
        }
        /**
         * @return {undefined}
         */
        ModelObject.prototype.serailize = function () {
        };
        /**
         * @param {?} dataAndEvents
         * @return {undefined}
         */
        ModelObject.prototype.deserailize = function (dataAndEvents) {
        };
        return ModelObject;
    }());
    exports.ModelObject = ModelObject;
});
//# sourceMappingURL=ModelObject.js.map