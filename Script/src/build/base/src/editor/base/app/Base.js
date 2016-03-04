var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../core/EventTarget', '../model/Floorplan', '../cmd/Manager', '../transaction/Manager', '../selection/Manager', '../plugin/Manager', './setting/AppSettings', './setting/AppParams'], function (require, exports, EventTarget_1, Floorplan_1, Manager_1, Manager_2, Manager_3, Manager_4, AppSettings_1, AppParams_1) {
    "use strict";
    var Base = (function (_super) {
        __extends(Base, _super);
        function Base() {
            _super.call(this);
            this.floorplan = new Floorplan_1.Floorplan();
            this.cmdManager = Manager_1.Manager.instance();
            this.transManager = new Manager_2.Manager();
            this.active_view = null;
            this.selectionManager = Manager_3.Manager.instance();
            this.pluginManager = new Manager_4.Manager(this);
            this.appSettings = new AppSettings_1.AppSettings();
            this.appParams = new AppParams_1.AppParams();
            this.resetDesignData();
        }
        Base.prototype.listen = function (dom) {
        };
        Base.prototype.resetDesignData = function () {
            this.threeDThumbnail = this.designName = this.designId = "";
            this.designMetaData = null;
        };
        Base.prototype.cleanDocumment = function () {
        };
        Base.prototype.newDocument = function () {
        };
        Base.prototype.openDocument = function (a) {
        };
        Base.prototype._openDocument = function (a) {
        };
        Base.prototype.saveDocument = function (a, b, c) {
        };
        Base.prototype.registerView = function (a, b) {
        };
        Base.prototype.getView = function (a) {
        };
        Base.prototype.activeView = function (a) {
        };
        Base.prototype.isActiveView = function () {
        };
        Base.prototype.forEachView = function () {
        };
        Base.prototype.run = function () {
        };
        Base.prototype.registerPlugin = function (a) {
        };
        Base.prototype.unRegisterPlugin = function (a) {
        };
        Base.getApp = function () {
            //
            // Base._app = Base._app || new Professional();
            // return Base._app;
        };
        Base.prototype.bindViewElement = function (name, element) {
        };
        return Base;
    }(EventTarget_1.EventTarget));
    exports.Base = Base;
});
//# sourceMappingURL=Base.js.map