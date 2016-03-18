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
   public frame;
   public frameProcess;
   public frameDraw;
   public frameDrawSort;
   public frameDrawRenderable;

   //==========================================================
   // <T>构造处理。</T>
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
   //==========================================================
   public reset() {
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //==========================================================
   public resetFrame() {
      this.frame.reset();
      this.frameProcess.reset();
      this.frameDraw.reset();
      this.frameDrawSort.reset();
      this.frameDrawRenderable.reset();
   }
}