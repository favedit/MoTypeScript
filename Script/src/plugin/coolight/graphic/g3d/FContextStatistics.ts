import {FStatistics} from '../../../../runtime/core/console/FStatistics';

//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
export class FContextStatistics extends FStatistics {
   // @attribute
   public frameClearCount: number = 0;
   public frameFillModeCount: number = 0;
   public frameDepthModeCount: number = 0;
   public frameDepthMaskCount: number = 0;
   public frameCullModeCount: number = 0;
   public frameBlendModeCount: number = 0;
   public frameProgramCount: number = 0;
   public frameConstCount: number = 0;
   public frameConstLength: number = 0;
   public frameBufferCount: number = 0;
   public frameTextureCount: number = 0;
   public frameTargetCount: number = 0;
   public frameDrawCount: number = 0;
   public frameTriangleCount: number = 0;
   // @attribute
   public programTotal: number = 0;
   public layoutTotal: number = 0;
   public vertexBufferTotal: number = 0;
   public indexBufferTotal: number = 0;
   public flatTextureTotal: number = 0;
   public cubeTextureTotal: number = 0;
   public targetTotal: number = 0;

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   public reset() {
      this.programTotal = 0;
      this.layoutTotal = 0;
      this.vertexBufferTotal = 0;
      this.indexBufferTotal = 0;
      this.flatTextureTotal = 0;
      this.cubeTextureTotal = 0;
      this.targetTotal = 0;
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   public resetFrame() {
      this.frameClearCount = 0;
      this.frameFillModeCount = 0;
      this.frameDepthModeCount = 0;
      this.frameDepthMaskCount = 0;
      this.frameCullModeCount = 0;
      this.frameBlendModeCount = 0;
      this.frameProgramCount = 0;
      this.frameConstCount = 0;
      this.frameConstLength = 0;
      this.frameBufferCount = 0;
      this.frameTextureCount = 0;
      this.frameTargetCount = 0;
      this.frameTriangleCount = 0;
      this.frameDrawCount = 0;
   }
}
