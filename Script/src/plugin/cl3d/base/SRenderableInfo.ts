import {RObject} from '../../../runtime/common/lang/RObject';

//==========================================================
// <T>可渲染对象信息。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
export class SRenderableInfo {
   // @attribute 代码
   public effect = null;
   public layout = null;
   public material = null;

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this.effect = null;
      this.layout = RObject.dispose(this.layout);
   }
}
