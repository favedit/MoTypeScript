import {SValue3} from './SValue3';

//==========================================================
// <T>三维向量。</T>
//
// @struct
// @param x:Number X方向
// @param y:Number Y方向
// @param z:Number Z方向
// @author maocy
// @version 141231
//==========================================================
export class SVector3 extends SValue3 {
   //==========================================================
   // <T>计算开始到结束的方向</T>
   //
   // @param start 开始
   // @param end 结束
   //==========================================================
   public direction(start: SValue3, end: SValue3) {
      this.x = end.x - start.x;
      this.y = end.y - start.y;
      this.z = end.z - start.z;
      return this;
   }

   //============================================================
   // <T>获得反方向。</T>
   //
   // @param value 内容
   // @return 反方向
   //============================================================
   public conjugate(value) {
      var instance: SVector3 = null;
      if (value) {
         instance = value;
      } else {
         instance = new SVector3();
      }
      instance.x = -this.x;
      instance.y = -this.y;
      instance.z = -this.z;
      return instance;
   }

   //==========================================================
   // <T>向量点乘</T>
   //
   // @param value:SVector3 三维向量
   //==========================================================
   public dotPoint3(value) {
      return (this.x * value.x) + (this.y * value.y) + (this.z * value.z);
   }

   //==========================================================
   // <T>点乘(内积)。</T>
   //
   // @param value 三维向量
   //==========================================================
   public cross(value) {
      var vx = (this.y * value.z) - (this.z * value.y);
      var vy = (this.z * value.x) - (this.x * value.z);
      var vz = (this.x * value.y) - (this.y * value.x);
      this.x = vx;
      this.y = vy;
      this.z = vz;
   }

   //==========================================================
   // <T>点乘(内积)。</T>
   //
   // @param output 输出三维向量
   // @param input 输入三维向量
   //==========================================================
   public cross2(po, pi) {
      po.x = (this.y * pi.z) - (this.z * pi.y);
      po.y = (this.z * pi.x) - (this.x * pi.z);
      po.z = (this.x * pi.y) - (this.y * pi.x);
   }

   //==========================================================
   // <T>计算插值。</T>
   //
   // @param value1 开始内容
   // @param value2 结束内容
   // @param rate 比率
   //==========================================================
   public slerp(v1, v2, r) {
      this.x = (v2.x - v1.x) * r + v1.x;
      this.y = (v2.y - v1.y) * r + v1.y;
      this.z = (v2.z - v1.z) * r + v1.z;
   }

   //==========================================================
   // <T>获得克隆对象。</T>
   //
   // @return 克隆对象
   //==========================================================
   public clone() {
      var instance = new SVector3();
      instance.x = this.x;
      instance.y = this.y;
      instance.z = this.z;
      return instance;
   }
}
