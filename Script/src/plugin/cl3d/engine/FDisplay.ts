import {RObject} from '../../../runtime/common/lang/RObject';
import {SOutline3d} from '../../../runtime/common/math/SOutline3d';
import {RAssert} from '../../../runtime/common/RAssert';
import {FDisplay as FBaseDisplay} from '../base/FDisplay';

//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FDisplay extends FBaseDisplay {
   // 图形环境
   public graphicContext: any = null;
   // 轮廓
   public outline: SOutline3d = null;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.outline = new SOutline3d();
   }

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @param context 图形环境
   //==========================================================
   public linkGraphicContext(context) {
      RAssert.debugNotNull(context);
      this.graphicContext = context;
   }

   //==========================================================
   // <T>计算轮廓大小。</T>
   //
   // @return 轮廓
   //==========================================================
   public calculateOutline(): SOutline3d {
      return this.outline;
   }

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public dispose() {
      this.graphicContext = null;
      this.outline = RObject.free(this.outline);
      // 父处理
      super.dispose();
   }
}