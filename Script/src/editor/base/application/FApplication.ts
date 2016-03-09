import {FObjects} from '../../../runtime/common/lang/FObjects'
import {IView} from './IView'

export class FApplication {

   public views: FObjects<IView> = null;

   /**
    * @return {undefined}
    */
   public constructor() {
      //goog.events.EventTarget.call(this);
      //this.floorplan = sk_create("hsw.model.Floorplan", hsw.model.Floorplan);
      //this.cmdManager = hsw.cmd.Manager.instance();
      //this.transManager = sk_create("hsw.transaction.Manager", hsw.transaction.Manager);
      this.views = new FObjects<IView>();
      //this.active_view = void 0;
      //this.selectionManager = hsw.selection.Manager.instance();
      //this.pluginManager = sk_create("hsw.plugin.Manager", hsw.plugin.Manager, this);
      //this.appSettings = sk_create("hsw.app.setting.AppSettings", hsw.app.setting.AppSettings);
      //this.appParams = sk_create("hsw.app.setting.AppParams", hsw.app.setting.AppParams);
      //this.resetDesignData();
   };

   // hsw.app.Base.prototype.logger = log.logger("hsw.app.Base");

   /**
    * @return {undefined}
    */
   public resetDesignData() {
      /** @type {string} */
      //this.threeDThumbnail = this.designName = this.designId = "";
      /** @type {null} */
      //this.designMetaData = null;
   };

   /**
    * @return {undefined}
    */
   public cleanDocumment() {
      // hsw.core.brep.Entity.prototype.database = {};
      // hsw.core.brep.Entity.prototype.database[this.floorplan.ID] = this.floorplan;
      //this.floorplan.clear();
      //this.cmdManager.clear();
      //this.transManager.clear();
      //this.selectionManager.unselectAll();
   };

   /**
    * @return {undefined}
    */
   public newDocument() {
      this.cleanDocumment();
      this.resetDesignData();
   };

   /**
    * @param {?} inEvent
    * @return {undefined}
    */
   public openDocument(inEvent) {
      this._openDocument(inEvent);
   };

   /**
    * @param {?} e
    * @return {undefined}
    */
   public _openDocument(e) {
      this.cleanDocumment();
      //var db = this.floorplan;
      //db.close();
      //db.open(e);
   };


   /**
    * @param {string} docID
    * @param {?} opt_attributes
    * @param {?} keepData
    * @return {undefined}
    */
   public saveDocument = function(docID, opt_attributes, keepData) {
   };

   /**
    * @param {string} key
    * @param {string} child
    * @param {string} name
    * @return {?}
    */
   public bindViewElement(key, child, name) {
      // if (child) {
      //    var copy = hsw.view[key];
      //    if (copy) {
      //       if (copy.Canvas.browserSupport()) {
      //          return child = new copy.Canvas(child, name), this.registerView(key, child), child;
      //       }
      //       this.logger.warning("view is not supported: " + key);
      //    }
      // }
   };

   /**
    * @param {string} name
    * @param {string} view
    * @return {undefined}
    */
   public registerView(name, view) {
      /** @type {string} */
      this.views[name] = view;
   };

   /**
    * @param {string} name
    * @return {?}
    */
   public getView(name) {
      return this.views[name];
   };

   /**
    * @param {string} name
    * @return {undefined}
    */
   public activeView(name) {
      // this.dispatchEvent(new goog.events.Event(hsw.app.ViewEventTypeEnum.active, {
      //    view: name,
      //    before: true
      // }));
      // var ret = this.getView(name);
      // if (ret && ret !== this.active_view) {
      //    if (this.active_view) {
      //       this.active_view.onDeactive();
      //    }
      //    this.active_view = ret;
      //    ret.onActive();
      //    this.dispatchEvent(new goog.events.Event(hsw.app.ViewEventTypeEnum.active, {
      //       view: name,
      //       before: false
      //    }));
      // }
   };

   /**
    * @param {string} name
    * @return {?}
    */
   public isActiveView(name) {
      // return (name = this.getView(name)) ? name === this.active_view : false;
   };

   /**
    * @param {Function} fn
    * @param {?} thisv
    * @return {undefined}
    */
   public forEachView(fn, thisv) {
      if (fn) {
         Object.keys(this.views).forEach(function(i) {
            fn.call(thisv, this.views[i], i);
         }, this);
      }
   };

   /**
    * @return {undefined}
    */
   public run() {
      //this.cmdManager.init(this);
      // var hsw_bak = window.hsw;
      //this.pluginManager.loadAll();
      // window.hsw = hsw_bak;
      //this.newDocument();
   };

   /**
    * @param {?} plugin
    * @return {?}
    */
   public registerPlugin(plugin) {
      //return this.pluginManager.registerPlugin(plugin);
   };

   /**
    * @param {?} deepDataAndEvents
    * @return {?}
    */
   public unRegisterPlugin(deepDataAndEvents) {
      //return this.pluginManager.unRegisterPlugin(deepDataAndEvents);
   };

   /**
    * @return {undefined}
    */
   // hsw.app.Base.getApp = function() {
   // };

   // if(window.navigator) {
   //    if (window.navigator.userAgent) {
   //       goog.userAgent.IE = goog.userAgent.IE || (-1 !== navigator.userAgent.indexOf(".NET4.0E") || -1 !== navigator.userAgent.indexOf(".NET4.0C"));
   //    }
   // }
   // hsw.io.load = {};

   // /**
   //  * @return {undefined}
   //  */
   // hsw.app.Base.getApp = function() {
   //    hsw.app.Base._app = hsw.app.Base._app || sk_create("hsw.app.Professional", hsw.app.Professional);
   //    return hsw.app.Base._app;
   // };

}