import {SPoint3} from './SPoint3';

//==========================================================
// <T>三维轮廓。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
export class SOutline3 {
   // 最小点
   public min: SPoint3 = new SPoint3();
   // 最大点
   public max: SPoint3 = new SPoint3();

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @return  是否为空
   //============================================================
   public isEmpty(): boolean {
      return this.min.isEmpty() && this.max.isEmpty();
   }

   //============================================================
   // <T>接收一个三维轮廓。</T>
   //
   // @param value 三维轮廓
   //============================================================
   public assign(value: SOutline3) {
      this.min.assign(value.min);
      this.max.assign(value.max);
   }

   //==========================================================
   // <T>设置最小轮廓。</T>
   //
   // @method
   //==========================================================
   public setMin() {
      this.min.setMax();
      this.max.setMin();
   }

   //==========================================================
   // <T>设置最大轮廓。</T>
   //
   // @method
   //==========================================================
   public setMax() {
      this.min.setMin();
      this.max.setMax();
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
      this.min.set(minX, minY, minZ);
      this.max.set(maxX, maxY, maxZ);
   }

   //==========================================================
   // <T>合并最小轮廓。</T>
   //
   // @method
   // @param outline  轮廓
   //==========================================================
   public mergeMin(outline) {
      this.min.mergeMax(outline.min);
      this.max.mergeMin(outline.max);
   }

   //==========================================================
   // <T>合并最大轮廓。</T>
   //
   // @method
   // @param outline 轮廓
   //==========================================================
   public mergeMax(outline) {
      this.min.mergeMin(outline.min);
      this.max.mergeMax(outline.max);
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
      this.min.mergeMin3(x, y, z);
      this.max.mergeMax3(x, y, z);
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param output 数据流
   //==========================================================
   public serialize(output) {
      this.min.serialize(output);
      this.max.serialize(output);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param input  数据流
   //==========================================================
   public unserialize(input) {
      this.min.unserialize(input);
      this.max.unserialize(input);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return 字符串
   //============================================================
   public toString() {
      return '(' + this.min + ')-(' + this.max + ')';
   }
}
