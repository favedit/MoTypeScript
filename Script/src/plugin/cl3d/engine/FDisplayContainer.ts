import {RObject} from '../../../runtime/common/lang/RObject';
import {SOutline3d} from '../../../runtime/common/math/SOutline3d';
import {FDisplayContainer as FBaseDisplayContainer} from '../base/FDisplayContainer';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FE3dDisplayContainer extends FBaseDisplayContainer {
   // 轮廓
   protected _outline: SOutline3d = null;
   //    o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this._outline = new SOutline3d();
   }

   //==========================================================
   // <T>获得轮廓。</T>
   //
   // @return 轮廓
   //==========================================================
   public get outline(): SOutline3d {
      return this._outline;
   }

   //==========================================================
   // <T>计算轮廓大小。</T>
   //
   // @method
   // @return SOutline3 轮廓
   //==========================================================
   public calculateOutline() {
      var outline = this._outline;
      if (outline.isEmpty()) {
         outline.setMin();
         // 计算渲染集合的轮廓
         var renderables = this.renderables;
         if (renderables) {
            var count: number = renderables.count();
            for (var n: number = 0; n < count; n++) {
               var renderable: any = renderables.at(n);
               var renderableOutline = renderable.calculateOutline()
               outline.mergeMax(renderableOutline);
            }
         }
      }
      return outline;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._outline = RObject.free(this._outline);
      //o._materials = MO.Lang.Object.dispose(o._materials);
      // 父处理
      super.dispose();
   }
}