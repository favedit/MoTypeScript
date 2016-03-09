import {FConsole} from '../FConsole';

export class FPluginConsole extends FConsole {

   /**
    * @param {Object} AppView
    * @return {undefined}
    */
   public constructor(AppView) {
      super();
      this.signalPluginActived = sk_create("hsw.util.Signal", hsw.util.Signal, this);
      this.signalPluginDeactived = sk_create("hsw.util.Signal", hsw.util.Signal, this);
      this.plugins = {};
      this.context = {
         app: AppView
      };
      /** @type {Array} */
      this._loadingPlugins = [];
   };

   /**
    * @param {?} plugin
    * @return {undefined}
    */
   hsw.plugin.Manager.prototype.registerPlugin = function(plugin) {
      if (void 0 === this.plugins[plugin]) {
         /** @type {null} */
         this.plugins[plugin] = null;
      } else {
         assert("this plugin " + plugin + " already registered");
      }
   };

   /**
    * @param {?} k
    * @return {?}
    */
   hsw.plugin.Manager.prototype.unRegisterPlugin = function(k) {
      var plugin = this.plugins[k];
      if (plugin) {
         this.unload(k);
      }
      delete this.plugins[k];
      return plugin;
   };

   /**
    * @return {undefined}
    */
   hsw.plugin.Manager.prototype.loadAll = function() {
      var pn;
      for (pn in this.plugins) {
         this.load(pn);
      }
   };

   /**
    * @return {undefined}
    */
   hsw.plugin.Manager.prototype.unloadAll = function() {
      var pdataCur;
      for (pdataCur in this.plugins) {
         this.unload(pdataCur);
      }
   };

   /**
    * @param {?} plugin
    * @return {?}
    */
   hsw.plugin.Manager.prototype.getPlugin = function(plugin) {
      return this.plugins[plugin];
   };

   /**
    * @param {string} options
    * @return {?}
    */
   hsw.plugin.Manager.prototype.load = function(options) {
      assert(options && "string" === typeof options, "Invalid type of plugin type.");
      if (this._loadingPlugins.includes(options)) {
         assert(false, "loading plugin for another time: " + options + ". is there a circular reference between plugins?");
         assert(false, "current loading plugins: [" + this._loadingPlugins.join(", ") + "]");
      } else {
         if (null !== this.plugins[options]) {
            return this.plugins[options];
         }
         this._loadingPlugins.push(options);
         var result = new (eval(options));
         assert(result instanceof hsw.plugin.IPlugin, 'all plugins should derived from "hsw.plugin.IPlugin" interface');
         /** @type {string} */
         result.type = options;
         this.plugins[options] = result;
         result.onCreate(this.context);
         if (result.enable) {
            var udataCur = {};
            result.dependencies.forEach(function(pn) {
               udataCur[pn] = this.load(pn);
            }, this);
            result.onActive(this.context, udataCur);
            this.signalPluginActived.dispatch({
               type: options,
               plugin: result
            });
         }
         this._loadingPlugins.xRemove(options);
         return result;
      }
   };

   /**
    * @param {?} data
    * @return {undefined}
    */
   hsw.plugin.Manager.prototype.unload = function(data) {
   };
}