import {Fatal} from '../lang/Fatal';
import {FloatUtil} from '../lang/FloatUtil';

//==========================================================
// <T>四维数据。</T>
//
// @struct
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
// @param w:Number W分量
// @author maocy
// @version 150208
//==========================================================
export class SValue4 {
   //..........................................................
   // @attribute
   x: number = 0;
   y: number = 0;
   z: number = 0;
   w: number = 0;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //============================================================
   constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
   }

   //==========================================================
   // <T>接收数据内容。</T>
   //
   // @method
   // @param value:SValue4 四维数据
   //==========================================================
   public assign(value) {
      this.x = value.x;
      this.y = value.y;
      this.z = value.z;
      this.w = value.w;
   }

   //==========================================================
   // <T>设置数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   // @param w:Number W分量
   //==========================================================
   public set(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
   }

   //==========================================================
   // <T>增加数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   // @param w:Number W分量
   //==========================================================
   public add(x, y, z, w) {
      this.x += x;
      this.y += y;
      this.z += z;
      this.w += w;
   }

   //==========================================================
   // <T>乘以数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   // @param w:Number W分量
   //==========================================================
   public mul(x, y, z, w) {
      this.x *= x;
      this.y *= y;
      this.z *= z;
      this.w *= w;
   }

   //==========================================================
   // <T>获得绝对值。</T>
   //
   // @method
   // @return Number 绝对值
   //==========================================================
   public absolute() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
   }

   //==========================================================
   // <T>单位化处理。</T>
   //
   // @method
   //==========================================================
   public normalize() {
      var value = this.absolute();
      if (value != 0) {
         var rate = 1 / value;
         this.x *= rate;
         this.y *= rate;
         this.z *= rate;
         this.w *= rate;
      }
   }

   //============================================================
   // <T>获得负数据内容。</T>
   //
   // @method
   // @param value:SValue4 数据内容
   // @return SValue4 数据内容
   //============================================================
   public negative(value) {
      // 生成内容
      var result = null;
      if (value) {
         result = value;
      } else {
         result = new (this.constructor as any)();
      }
      // 设置内容
      result.x = -this.x;
      result.y = -this.y;
      result.z = -this.z;
      result.w = -this.w;
      return result;
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param output:FByteStream 数据流
   //==========================================================
   public serialize(output) {
      output.writeFloat(this.x);
      output.writeFloat(this.y);
      output.writeFloat(this.z);
      output.writeFloat(this.w);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   public unserialize(input) {
      this.x = input.readFloat();
      this.y = input.readFloat();
      this.z = input.readFloat();
      this.w = input.readFloat();
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @method
   // @param value:String 字符串
   //============================================================
   public parse(value) {
      var items = value.split(',')
      if (items.length == 4) {
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
         this.z = parseFloat(items[2]);
         this.w = parseFloat(items[3]);
      } else {
         throw new Fatal(this, "Parse value failure. (value={1})", value);
      }
   }

   //==========================================================
   // <T>获得显示内容。</T>
   //
   // @return String 字符串
   //==========================================================
   public toDisplay() {
      var o = this;
      var x = FloatUtil.format(o.x);
      var y = FloatUtil.format(o.y);
      var z = FloatUtil.format(o.z);
      var w = FloatUtil.format(o.w);
      return x + ',' + y + ',' + z + ',' + w;
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      var o = this;
      o.x = null;
      o.y = null;
      o.z = null;
      o.w = null;
   }
}
