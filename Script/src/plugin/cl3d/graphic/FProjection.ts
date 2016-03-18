import {RObject} from '../../../runtime/common/lang/RObject';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {SSize2} from '../../../runtime/common/math/SSize2';
import {FObject} from '../../../runtime/common/lang/FObject';

//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FProjection extends FObject {
   // 矩阵
   public matrix: SMatrix3d = null;
   // 尺寸
   public size: SSize2 = null;
   // 角度
   public angle: number = 60;
   // 夹角
   public fieldOfView = 0;
   // 近平面
   public znear: number = 0.1;
   // 远平面
   public zfar: number = 200;
   // 缩放
   public zoom: number = 1;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.matrix = new SMatrix3d();
      this.size = new SSize2();
   }

   //==========================================================
   // <T>获得距离。</T>
   //
   // @method
   // @return Number 距离
   //==========================================================
   public distance() {
      return this.zfar - this.znear;
   }


   //============================================================
   // <T>更新矩阵。</T>
   //
   // @method
   //============================================================
   public update() {
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性
      this.matrix = RObject.dispose(this.matrix);
      this.size = RObject.dispose(this.size);
      // 父处理
      super.dispose();
   }
}
