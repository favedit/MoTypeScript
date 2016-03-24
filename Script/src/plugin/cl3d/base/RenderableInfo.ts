import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';

//==========================================================
// <T>可渲染对象信息。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class RenderableInfo {
   // 材质
   public material;
   // 效果器
   public effect;
   // 渲染层
   public layout;

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this.material = null;
      this.effect = null;
      this.layout = ObjectUtil.dispose(this.layout);
   }
}
