import {ObjectBase} from '../../common/lang/ObjectBase';
import {IPlugin} from './IPlugin';

//==========================================================
// <T>插件对象。</T>
//
// @reference
// @author maocy
// @version 160309
//==========================================================
export class FPlugin extends ObjectBase implements IPlugin {

   // 类型
   public type = null;
   // 名称
   public name = null;
   // 有效
   public enable = null;
   // 描述
   public description = null;
   // 依赖
   public dependencies = null;
   // 加载器
   public loader = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor(plugin) {
      super();
      plugin = plugin || {};
      this.type = void 0;
      this.enable = void 0 !== plugin.enable ? plugin.enable : true;
      this.name = void 0 !== plugin.name ? plugin.name : "Unnamed plugin";
      this.description = void 0 !== plugin.description ? plugin.description : "No Description";
      this.dependencies = void 0 !== plugin.dependencies ? plugin.dependencies : [];
   }

   //==========================================================
   // <T>创建处理。</T>
   //==========================================================
   public onCreate(flash) {
   }

   //==========================================================
   // <T>激活处理。</T>
   //==========================================================
   public onActive(element, value) {
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //==========================================================
   public onDeactive(dataAndEvents) {
   }

   //==========================================================
   // <T>销毁处理。</T>
   //==========================================================
   public onDestroy(up) {
   }
}