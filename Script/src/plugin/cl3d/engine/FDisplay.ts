import {RObject} from '../../../runtime/common/lang/RObject';
import {SOutline3d} from '../../../runtime/common/math/SOutline3d';
import {FDisplay as FBaseDisplay} from '../base/FDisplay';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FE3dDisplay extends FBaseDisplay {
   // 轮廓
   protected _outline: SOutline3d = null;
   //    o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
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
   // @return 轮廓
   //==========================================================
   public calculateOutline() {
      return this._outline;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this._outline = RObject.free(this._outline);
      //o._materials = MO.Lang.Object.free(o._materials);
      // 父处理
      super.dispose();
   }
}