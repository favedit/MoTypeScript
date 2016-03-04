import {RObject} from '../../../../runtime/common/lang/RObject';
import {SSize2} from '../../../../runtime/common/math/SSize2';
import {FGraphicContext} from '../context/FGraphicContext';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG2dContext extends FGraphicContext {
   //..........................................................
   // @attribute
   //_globalScale = MO.Class.register(o, new MO.AGetter('_globalScale'));
   _globalScale: SSize2 = null;
   //_scale = MO.Class.register(o, new MO.AGetter('_scale'));
   _scale: SSize2 = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._globalScale = new SSize2(1, 1);
      this._scale = new SSize2(1, 1);
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   public linkCanvas(hCanvas) {
      this._size.set(hCanvas.width, hCanvas.height);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this._globalScale = RObject.dispose(this._globalScale);
      this._scale = RObject.dispose(this._scale);
      // 父处理
      super.dispose();
   }
}
