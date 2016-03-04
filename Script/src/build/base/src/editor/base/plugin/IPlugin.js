var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core/EventTarget'], function (require, exports, EventTarget_1) {
    "use strict";
    var IPlugin = (function (_super) {
        __extends(IPlugin, _super);
        function IPlugin(config) {
            _super.call(this);
            config = config || {};
            this.type = void 0;
            this.enable = void 0 !== config.enable ? config.enable : !0;
            this.name = void 0 !== config.name ? config.name : "Unnamed plugin";
            this.description = void 0 !== config.description ? config.description : "No Description";
            this.dependencies = void 0 !== config.dependencies ? config.dependencies : [];
        }
        IPlugin.prototype.onCreate = function (a) {
        };
        IPlugin.prototype.onDestory = function (a) {
        };
        IPlugin.prototype.onActive = function (context, b) {
        };
        IPlugin.prototype.onDeactive = function (context) {
        };
        return IPlugin;
    }(EventTarget_1.EventTarget));
    exports.IPlugin = IPlugin;
});
//# sourceMappingURL=IPlugin.js.map