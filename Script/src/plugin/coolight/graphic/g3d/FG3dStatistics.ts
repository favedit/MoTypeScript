import {FStatistics} from '../../../../runtime/core/console/FStatistics';

//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
export class FG3dStatistics extends FStatistics {
   // @attribute
   //_frameClearCount = MO.Class.register(o, new MO.AGetter('_frameClearCount'), 0);
   //_frameFillModeCount = MO.Class.register(o, new MO.AGetter('_frameFillModeCount'), 0);
   //_frameDepthModeCount = MO.Class.register(o, new MO.AGetter('_frameDepthModeCount'), 0);
   //_frameCullModeCount = MO.Class.register(o, new MO.AGetter('_frameCullModeCount'), 0);
   //_frameBlendModeCount = MO.Class.register(o, new MO.AGetter('_frameBlendModeCount'), 0);
   //_frameProgramCount = MO.Class.register(o, new MO.AGetter('_frameProgramCount'), 0);
   //_frameConstCount = MO.Class.register(o, new MO.AGetter('_frameConstCount'), 0);
   //_frameConstLength = MO.Class.register(o, new MO.AGetter('_frameConstLength'), 0);
   //_frameBufferCount = MO.Class.register(o, new MO.AGetter('_frameBufferCount'), 0);
   //_frameTextureCount = MO.Class.register(o, new MO.AGetter('_frameTextureCount'), 0);
   //_frameTargetCount = MO.Class.register(o, new MO.AGetter('_frameTargetCount'), 0);
   //_frameDrawCount = MO.Class.register(o, new MO.AGetter('_frameDrawCount'), 0);
   //_frameTriangleCount = MO.Class.register(o, new MO.AGetter('_frameTriangleCount'), 0);
   // @attribute
   //_programTotal = MO.Class.register(o, new MO.AGetter('_programTotal'), 0);
   //_layoutTotal = MO.Class.register(o, new MO.AGetter('_layoutTotal'), 0);
   //_vertexBufferTotal = MO.Class.register(o, new MO.AGetter('_vertexBufferTotal'), 0);
   //_indexBufferTotal = MO.Class.register(o, new MO.AGetter('_indexBufferTotal'), 0);
   //_flatTextureTotal = MO.Class.register(o, new MO.AGetter('_flatTextureTotal'), 0);
   //_cubeTextureTotal = MO.Class.register(o, new MO.AGetter('_cubeTextureTotal'), 0);
   //_targetTotal = MO.Class.register(o, new MO.AGetter('_targetTotal'), 0);

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   public reset() {
      var o = this;
      //o._programTotal = 0;
      //o._layoutTotal = 0;
      //o._vertexBufferTotal = 0;
      //o._indexBufferTotal = 0;
      //o._flatTextureTotal = 0;
      //o._cubeTextureTotal = 0;
      //o._targetTotal = 0;
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   public resetFrame() {
      var o = this;
      //o._frameClearCount = 0;
      //o._frameFillModeCount = 0;
      //o._frameDepthModeCount = 0;
      //o._frameCullModeCount = 0;
      //o._frameBlendModeCount = 0;
      //o._frameProgramCount = 0;
      //o._frameConstCount = 0;
      //o._frameConstLength = 0;
      //o._frameBufferCount = 0;
      //o._frameTextureCount = 0;
      //o._frameTargetCount = 0;
      //o._frameTriangleCount = 0;
      //o._frameDrawCount = 0;
   }
}
