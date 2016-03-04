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
   // <T>计算2个点的方向</T>
   //
   // @method
   // @param startPoint:SPoint3 开始点
   // @param endPoint:SPoint3 结束点
   //==========================================================
   public direction(startPoint, endPoint) {
      var o = this;
      o.x = endPoint.x - startPoint.x;
      o.y = endPoint.y - startPoint.y;
      o.z = endPoint.z - startPoint.z;
      return o;
   }

   //============================================================
   // <T>获得反方向。</T>
   //
   // @method
   // @param p:value:SQuaternion 四元数
   // @return SQuaternion 四元数
   //============================================================
   public conjugate(p) {
      var o = this;
      var r = null;
      if (p) {
         r = p;
      } else {
         r = new SVector3();
      }
      r.x = -o.x;
      r.y = -o.y;
      r.z = -o.z;
      return r;
   }

   //==========================================================
   // <T>向量点乘</T>
   //
   // @method
   // @param value:SVector3 三维向量
   //==========================================================
   public dotPoint3(value) {
      var o = this;
      return (o.x * value.x) + (o.y * value.y) + (o.z * value.z);
   }

   //==========================================================
   // <T>点乘(内积)。</T>
   //
   // @method
   // @param value:SVector3 三维向量
   //==========================================================
   public cross(value) {
      var o = this;
      var vx = (o.y * value.z) - (o.z * value.y);
      var vy = (o.z * value.x) - (o.x * value.z);
      var vz = (o.x * value.y) - (o.y * value.x);
      o.x = vx;
      o.y = vy;
      o.z = vz;
   }

   //==========================================================
   // <T>点乘(内积)。</T>
   //
   // @method
   // @param po:output:SVector3 输出三维向量
   // @param pi:input:SVector3 输入三维向量
   //==========================================================
   public cross2(po, pi) {
      var o = this;
      po.x = (o.y * pi.z) - (o.z * pi.y);
      po.y = (o.z * pi.x) - (o.x * pi.z);
      po.z = (o.x * pi.y) - (o.y * pi.x);
   }

   //==========================================================
   // <T>计算插值。</T>
   //
   // @method
   // @param v1:value1:SQuaternion 开始四元数
   // @param v2:value2:SQuaternion 结束四元数
   // @param r:rate:Float 比率
   //==========================================================
   public slerp(v1, v2, r) {
      var o = this;
      o.x = (v2.x - v1.x) * r + v1.x;
      o.y = (v2.y - v1.y) * r + v1.y;
      o.z = (v2.z - v1.z) * r + v1.z;
   }

   //==========================================================
   // <T>获得克隆对象。</T>
   //
   // @method
   // @return SVector3 克隆对象
   //==========================================================
   public clone() {
      var o = this;
      var r = new SVector3();
      r.x = o.x;
      r.y = o.y;
      r.z = o.z;
      return r;
   }
}
