import {SPoint3} from './SPoint3';

//==========================================================
// <T>三维轮廓。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class SOutline3 {
   //..........................................................
   // @attribute
   public min: SPoint3 = new SPoint3();
   public max: SPoint3 = new SPoint3();

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //============================================================
   public isEmpty(p) {
      return this.min.isEmpty() && this.max.isEmpty();
   }

   //============================================================
   // <T>接收一个三维轮廓。</T>
   //
   // @method
   // @param p:value:SOutline3 三维轮廓
   //============================================================
   public assign(p) {
      var o = this;
      o.min.assign(p.min);
      o.max.assign(p.max);
   }

   //==========================================================
   // <T>设置最小轮廓。</T>
   //
   // @method
   //==========================================================
   public setMin() {
      var o = this;
      o.min.setMax();
      o.max.setMin();
   }

   //==========================================================
   // <T>设置最大轮廓。</T>
   //
   // @method
   //==========================================================
   public setMax() {
      var o = this;
      o.min.setMin();
      o.max.setMax();
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param ix:minX:Number 最小X坐标
   // @param iy:minY:Number 最小Y坐标
   // @param iz:minZ:Number 最小Z坐标
   // @param ax:maxX:Number 最大X坐标
   // @param ay:maxY:Number 最大Y坐标
   // @param az:maxZ:Number 最大Z坐标
   //==========================================================
   public set(minX, minY, minZ, maxX, maxY, maxZ) {
      var o = this;
      o.min.set(minX, minY, minZ);
      o.max.set(maxX, maxY, maxZ);
   }

   //==========================================================
   // <T>合并最小轮廓。</T>
   //
   // @method
   // @param p:outline:SOutline 轮廓
   //==========================================================
   public mergeMin(p) {
      var o = this;
      o.min.mergeMax(p.min);
      o.max.mergeMin(p.max);
   }

   //==========================================================
   // <T>合并最大轮廓。</T>
   //
   // @method
   // @param p:outline:SOutline 轮廓
   //==========================================================
   public mergeMax(p) {
      var o = this;
      o.min.mergeMin(p.min);
      o.max.mergeMax(p.max);
   }

   //==========================================================
   // <T>合并点。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   public mergePoint(x, y, z) {
      var o = this;
      o.min.mergeMin3(x, y, z);
      o.max.mergeMax3(x, y, z);
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public serialize(p) {
      var o = this;
      o.min.serialize(p);
      o.max.serialize(p);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   public unserialize(p) {
      var o = this;
      o.min.unserialize(p);
      o.max.unserialize(p);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      var o = this;
      return '(' + o.min + ')-(' + o.max + ')';
   }
}
