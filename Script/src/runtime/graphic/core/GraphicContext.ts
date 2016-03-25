import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';
import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {Size2} from '../../../runtime/common/math/Size2';

//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class GraphicContext extends ObjectBase {
   // 画板
   protected _hCanvas: HTMLCanvasElement = null;
   // 尺寸
   protected _size: Size2 = null;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._size = new Size2(1280, 720);
   }

   //==========================================================
   // <T>获得画板。</T>
   //
   // @return 画板
   //==========================================================
   public get htmlCanvas(): HTMLCanvasElement {
      return this._hCanvas;
   }

   //==========================================================
   // <T>获得尺寸。</T>
   //
   // @return 尺寸
   //==========================================================
   public get size(): Size2 {
      return this._size;
   }

   //==========================================================
   // <T>关联画板。</T>
   //
   // @param hCanvas 画板
   //==========================================================
   public linkCanvas(hCanvas: HTMLCanvasElement): void {
      this._hCanvas = hCanvas;
      this._size.set(hCanvas.width, hCanvas.height);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose(): void {
      // 释放属性
      this._size = ObjectUtil.dispose(this._size);
      this._hCanvas = null;
      // 父处理
      super.dispose();
   }
}
