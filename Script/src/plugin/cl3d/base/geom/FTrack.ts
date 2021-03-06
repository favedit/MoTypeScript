import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';

//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FTrack extends ObjectBase {
   // @attribute
   protected _frames = null;

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   // @param p:tick:Integer 时刻
   //==========================================================
   public update(p) {
      var o = this;
      // 计算帧信息
      /*var info = new MO.SG3dFrameInfo();
      o._trackResource.calculateFrameInfo(info, tick);
      info.update();
      // 计算矩阵
      o._matrix.assign(o._trackResource.matrixInvert());
      o._matrix.append(info.matrix);
      return true;*/
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   // @param p:tick:Integer 时刻
   //==========================================================
   public calculate(tick) {
      var o = this;
      // 检查帧数
      var frameCount = o._frames.count();
      if (frameCount == 0) {
         return false;
      }
      // 去掉负数
      if (tick < 0) {
         tick = -tick;
      }
      // 计算间隔
      //TInt span = (TInt)((TFloat)(TInt)tick * info.playRate);
      //TInt index = (span / _frameTick) % frameCount;
      // 获得当前帧和下一帧
      /*var pCurrentFrame = o._frames.Get(index);
      var pNextFrame = null;
      if (index < frameCount - 1) {
         pNextFrame = o._frames.Get(index + 1);
      } else {
         pNextFrame = o._frames.Get(0);
      }
      // 设置结果
      info.tick = tick;
      //info.rate = (TFloat)(span % _frameTick) / (TFloat)_frameTick;
      info.currentFrame = pCurrentFrame;
      info.nextFrame = pNextFrame;*/
      return true;
   }
}
