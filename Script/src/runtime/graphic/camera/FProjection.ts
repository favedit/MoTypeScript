import {ObjectUtil} from '../../../runtime/common/lang/ObjectUtil';
import {SMatrix3d} from '../../../runtime/graphic/math/SMatrix3d';
import {Size2} from '../../../runtime/common/math/Size2';
import {ObjectBase} from '../../../runtime/common/lang/ObjectBase';

//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FProjection extends ObjectBase {
   // 矩阵
   public matrix: SMatrix3d;
   // 尺寸
   public size: Size2;
   // 角度
   public angle: number;
   // 夹角
   public fieldOfView;
   // 近平面
   public znear: number;
   // 远平面
   public zfar: number;
   // 缩放
   public zoom: number;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      this.matrix = new SMatrix3d();
      this.size = new Size2();
      this.angle = 60;
      this.fieldOfView = 0;
      this.znear = 0.1;
      this.zfar = 200;
      this.zoom = 1;
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
      this.matrix = ObjectUtil.dispose(this.matrix);
      this.size = ObjectUtil.dispose(this.size);
      // 父处理
      super.dispose();
   }
}
