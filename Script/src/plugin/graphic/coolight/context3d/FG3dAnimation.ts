import {FObject} from '../../../../runtime/common/lang/FObject';
import {FObjects} from '../../../../runtime/common/lang/FObjects';
import {RObject} from '../../../../runtime/common/lang/RObject';

//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
export class FG3dAnimation extends FObject {
   // @attribute
   protected _baseTick = 0;
   protected _currentTick = 0;
   protected _lastTick = 0
   protected _bones = new FObjects();

   //==========================================================
   // <T>根据编号查找骨头。</T>
   //
   // @method
   // @param p:boneId:Integer 编号
   // @return FG3dBone 骨头
   //==========================================================
   public findBone(p) {
      var o = this;
      var bs = o._bones;
      var c = bs.count();
      for (var i = 0; i < c; i++) {
         var b = bs.get(i);
         if (b.boneId() == p) {
            return b;
         }
      }
      return null;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   public process() {
      var o = this;
      // 获得时间
      /*var t = MO.Timer.current();
      if (o._lastTick == 0) {
         o._lastTick = t;
      }
      o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
      // 计算间隔
      var bs = o._bones;
      var c = bs.count();
      for (var i = 0; i < c; i++) {
         var b = bs.get(i);
         b.update(o._currentTick);
      }*/
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this._bones = RObject.dispose(this._bones);
      super.dispose();
   }
}
