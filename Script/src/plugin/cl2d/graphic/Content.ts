import {GraphicObject} from '../../../runtime/graphic/core/GraphicObject';
import {Context} from './Context';

//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150212
//==========================================================
export class Content extends GraphicObject {
   // 图形环境
   public graphicContext: Context;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      super.dispose();
   }
}
