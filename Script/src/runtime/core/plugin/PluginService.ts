import {Objects} from '../../common/lang/Objects';
import {Dictionary} from '../../common/lang/Dictionary';
import {ObjectUtil} from '../../common/lang/ObjectUtil';
import {Listeners} from '../../common/lang/Listeners';
import {AnnotationEnum} from '../../common/reflect/AnnotationEnum';
import {Annotation} from '../../common/reflect/Annotation';
import {Class} from '../../common/reflect/Class';
import {ClassUtil} from '../../common/reflect/ClassUtil';
import {AssertUtil} from '../../common/AssertUtil';
import {Service} from '../Service';
import {PluginFace} from './PluginFace';
import {PluginAnnotation} from './PluginAnnotation';
import {PluginContext} from './PluginContext';

//==========================================================
// <T>插件管理器。</T>
//
// @reference
// @author maocy
// @version 160309
//==========================================================
export class PluginService extends Service {
   // 环境
   public context = null;
   // 插件集合
   public pluginAnnotations: Objects<PluginAnnotation> = null;
   // 插件集合
   public plugins: Objects<PluginFace> = null;
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
      this.pluginAnnotations = new Objects<PluginAnnotation>();
      this.plugins = new Objects<PluginFace>();
      this.activedListeners = new Listeners(this);
      this.deactivedListeners = new Listeners(this);
   }

   /**
    * @param {?} plugin
    * @return {undefined}
    */
   public registerAnnotation(annotation: PluginAnnotation) {
      this.pluginAnnotations.push(annotation);
   }

   /**
    * @param {?} plugin
    * @return {undefined}
    */
   public register(plugin: PluginFace) {
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
   public unregister(plugin: PluginFace) {
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
   public loadAnnotation(context: PluginContext, annotation: PluginAnnotation) {
      // 检查是否已经激活
      if (annotation.actived) {
         return;
      }
      // 加载依赖库
      var dependencies = annotation.dependencies;
      if (dependencies) {
         var count: number = dependencies.length;
         for (var n = 0; n < count; n++) {
            var dependency = dependencies[n];
            var dependencyClass: Class = ClassUtil.get(dependency);
            var dependencyAnnotations: Dictionary<Annotation> = dependencyClass.findAnnotations(AnnotationEnum.Plugin);
            var annotationCount = dependencyAnnotations.count();
            for (var i = 0; i < annotationCount; i++) {
               var dependencyAnnotation = dependencyAnnotations.at(i);
               if (dependencyAnnotation instanceof PluginAnnotation) {
                  this.loadAnnotation(context, <PluginAnnotation>dependencyAnnotation);
               }
            }
         }
      }
      // 激活插件
      var instance: PluginFace = annotation.clazz.instance;
      instance.active(context);
      annotation.actived = true;
      this.plugins.push(instance);
   }

   //==========================================================
   // <T>卸载插件。</T>
   //
   // @param plugin 插件
   //==========================================================
   public unloadPlugin(plugin: PluginFace) {
   }

   //==========================================================
   // <T>加载全部插件。</T>
   //==========================================================
   public loadAll(context: PluginContext) {
      var annotations: Objects<PluginAnnotation> = this.pluginAnnotations;
      var count: number = annotations.count();
      for (var n: number = 0; n < count; n++) {
         var annotation: PluginAnnotation = annotations.get(n);
         this.loadAnnotation(context, annotation);
      }
   }

   //==========================================================
   // <T>卸载全部插件。</T>
   //==========================================================
   public unloadAll() {
      var plugins: Objects<PluginFace> = this.plugins;
      var count: number = plugins.count();
      for (var n: number = 0; n < count; n++) {
         var plugin: PluginFace = plugins.get(n);
         this.unloadPlugin(plugin);
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
      this.activedListeners = ObjectUtil.dispose(this.activedListeners);
      this.deactivedListeners = ObjectUtil.dispose(this.deactivedListeners);
      super.dispose();
   }
}