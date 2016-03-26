import {ObjectBase} from '../../common/lang/ObjectBase';
import {PluginFace} from './PluginFace';
import {PluginContext} from './PluginContext';

//==========================================================
// <T>插件对象。</T>
//
// @reference
// @author maocy
// @version 160309
//==========================================================
export class PluginBase extends ObjectBase implements PluginFace {
   // 类型
   public type;
   // 名称
   public name;
   // 有效
   public enable;
   // 描述
   public description;
   // 依赖
   public dependencies;
   // 加载器
   public loader;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // plugin = plugin || {};
      // this.type = void 0;
      // this.enable = void 0 !== plugin.enable ? plugin.enable : true;
      // this.name = void 0 !== plugin.name ? plugin.name : "Unnamed plugin";
      // this.description = void 0 !== plugin.description ? plugin.description : "No Description";
      // this.dependencies = void 0 !== plugin.dependencies ? plugin.dependencies : [];
   }

   //==========================================================
   // <T>创建处理。</T>
   //==========================================================
   public create(context: PluginContext) {
   }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public active(context: PluginContext) {
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public deactive(context: PluginContext) {
   }

   //==========================================================
   // <T>销毁处理。</T>
   //==========================================================
   public destroy(context: PluginContext) {
   }
}