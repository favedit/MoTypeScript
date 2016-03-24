import {Value2} from './Value2';

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
export class Vector2 extends Value2 {

   //==========================================================
   // <T>计算2个点的方向</T>
   //
   // @method
   // @param startPoint:SPoint3 开始点
   // @param endPoint:SPoint3 结束点
   //==========================================================
   public direction(startPoint, endPoint) {
      this.x = endPoint.x - startPoint.x;
      this.y = endPoint.y - startPoint.y;
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
         r = new Vector2();
      }
      r.x = -o.x;
      r.y = -o.y;
      return r;
   }

   //==========================================================
   // <T>向量点乘</T>
   //
   // @method
   // @param v:value:SVector2 三维向量
   //==========================================================
   public dotPoint3(v) {
      var o = this;
      return (o.x * v.x) + (o.y * v.y);
   }

   //==========================================================
   // <T>点乘(内积)。</T>
   //
   // @method
   // @param v:value:SVector2 三维向量
   //==========================================================
   public cross(v) {
      var o = this;
      //var vx = (o.y * v.z) - (o.z * v.y);
      //var vy = (o.z * v.x) - (o.x * v.z);
      //var vz = (o.x * v.y) - (o.y * v.x);
      //o.x = vx;
      //o.y = vy;
   }

   //==========================================================
   // <T>点乘(内积)。</T>
   //
   // @method
   // @param po:output:SVector2 输出三维向量
   // @param pi:input:SVector2 输入三维向量
   //==========================================================
   public cross2(po, pi) {
      var o = this;
      //po.x = (o.y * pi.z) - (o.z * pi.y);
      //po.y = (o.z * pi.x) - (o.x * pi.z);
      //po.z = (o.x * pi.y) - (o.y * pi.x);
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
   }

   //==========================================================
   // <T>获得克隆对象。</T>
   //
   // @method
   // @return SVector2 克隆对象
   //==========================================================
   public clone() {
      var r = new Vector2();
      r.x = this.x;
      r.y = this.y;
      return r;
   }
}
