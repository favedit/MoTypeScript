import {Objects} from '../../common/lang/Objects';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Listeners} from '../../common/lang/Listeners';
import {FConsole} from '../FConsole';
import {IPlugin} from './IPlugin';

//==========================================================
// <T>插件管理器。</T>
//
// @reference
// @author maocy
// @version 160309
//==========================================================
export class FPluginConsole extends FConsole {
   // 环境
   public context = null;
   // 插件集合
   public plugins: Objects<IPlugin> = null;
   // 加载集合
   public loadingPlugins: Objects<IPlugin> = null;
   // 激活监听器
   public activedListeners: Listeners = null;
   // 取消激活监听器
   public deactivedListeners: Listeners = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(AppView) {
      super();
      // 设置属性
      this.context = { app: AppView };
      this.plugins = new Objects<IPlugin>();;
      this.loadingPlugins = new Objects<IPlugin>();
      this.activedListeners = new Listeners(this);
      this.deactivedListeners = new Listeners(this);
   };

   /**
    * @param {?} plugin
    * @return {undefined}
    */
   public register(plugin: IPlugin) {
      this.plugins.push(plugin);
      // if (void 0 === this.plugins[plugin]) {
      //    /** @type {null} */
      //    this.plugins[plugin] = null;
      // } else {
      //    // assert("this plugin " + plugin + " already registered");
      // }
   }

   /**
    * @param {?} k
    * @return {?}
    */
   public unregister(plugin: IPlugin) {
      // var plugin = this.plugins[k];
      // if (plugin) {
      //    this.unload(k);
      // }
      // delete this.plugins[k];
      // return plugin;
   }

   public getPlugin(plugin) {
      return this.plugins[plugin];
   }

   //==========================================================
   // <T>加载插件。</T>
   //
   // @param plugin 插件
   //==========================================================
   public load(plugin) {
      var context = this.context;
      //assert(options && "string" === typeof options, "Invalid type of plugin type.");
      if (this.loadingPlugins.contains(plugin)) {
         //assert(false, "loading plugin for another time: " + options + ". is there a circular reference between plugins?");
         //assert(false, "current loading plugins: [" + this._loadingPlugins.join(", ") + "]");
      } else {
         if (null !== this.plugins[plugin]) {
            return this.plugins[plugin];
         }
         this.loadingPlugins.push(plugin);
         var result: IPlugin = new (eval(plugin));
         //assert(result instanceof hsw.plugin.IPlugin, 'all plugins should derived from "hsw.plugin.IPlugin" interface');
         /** @type {string} */
         result.type = plugin;
         this.plugins[plugin] = result;
         result.onCreate(context);
         if (result.enable) {
            var udataCur = {};
            var dependencies = result.dependencies;
            var count = dependencies.count();
            for (var n = 0; n < count; n++) {
               var dependencyPlugin: IPlugin = dependencies.at(n);
               var dependencyName = dependencyPlugin.name;
               udataCur[dependencyName] = this.load(dependencyPlugin);
            }
            result.onActive(context, udataCur);
            this.activedListeners.process(plugin);
         }
         //this._loadingPlugins.xRemove(options);
         return result;
      }
   };

   //==========================================================
   // <T>卸载插件。</T>
   //
   // @param plugin 插件
   //==========================================================
   public unload(data?) {
   }

   //==========================================================
   // <T>加载全部插件。</T>
   //==========================================================
   public loadAll() {
      var plugins: Objects<IPlugin> = this.plugins;
      var count: number = plugins.count();
      for (var n: number = 0; n < count; n++) {
         var plugin: IPlugin = plugins.get(n);
         this.load(plugin);
      }
   }

   //==========================================================
   // <T>卸载全部插件。</T>
   //==========================================================
   public unloadAll() {
      var plugins: Objects<IPlugin> = this.plugins;
      var count: number = plugins.count();
      for (var n: number = 0; n < count; n++) {
         var plugin: IPlugin = plugins.get(n);
         this.unload(plugin);
      }
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   public dispose(flag: boolean = false): void {
      this.context = ObjectUtil.dispose(this.context);
      this.plugins = ObjectUtil.dispose(this.plugins);
      this.loadingPlugins = ObjectUtil.dispose(this.loadingPlugins);
      this.activedListeners = ObjectUtil.dispose(this.activedListeners);
      this.deactivedListeners = ObjectUtil.dispose(this.deactivedListeners);
      super.dispose();
   }
}