var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Request'], function (require, exports, Request_1) {
    "use strict";
    var CompositeRequest = (function (_super) {
        __extends(CompositeRequest, _super);
        function CompositeRequest() {
            _super.apply(this, arguments);
        }
        return CompositeRequest;
    }(Request_1.Request));
    exports.CompositeRequest = CompositeRequest;
});
//# sourceMappingURL=CompositeRequest.js.map