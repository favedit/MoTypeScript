import {FSpeed} from '../../../runtime/common/lang/FSpeed';
import {FStatistics} from '../../../runtime/core/console/FStatistics';

//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
export class FSceneStatistics extends FStatistics {
   public frame = null;
   public frameProcess = null;
   public frameDraw = null;
   public frameDrawSort = null;
   public frameDrawRenderable = null;

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.frame = new FSpeed();
      this.frameProcess = new FSpeed();
      this.frameDraw = new FSpeed();
      this.frameDrawSort = new FSpeed();
      this.frameDrawRenderable = new FSpeed();
   }

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   public reset() {
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   public resetFrame() {
      var o = this;
      o.frame.reset();
      o.frameProcess.reset();
      o.frameDraw.reset();
      o.frameDrawSort.reset();
      o.frameDrawRenderable.reset();
   }
}