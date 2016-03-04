var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Request'], function (require, exports, Request_1) {
    "use strict";
    var DataRequest = (function (_super) {
        __extends(DataRequest, _super);
        function DataRequest() {
            _super.apply(this, arguments);
        }
        return DataRequest;
    }(Request_1.Request));
    exports.DataRequest = DataRequest;
});
//# sourceMappingURL=DataRequest.js.map