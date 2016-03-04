import {EDataType} from '../lang/EDataType';
import {FError} from '../lang/FError';
import {RFloat} from '../lang/RFloat';

//==========================================================
// <T>二维数据。</T>
//
// @struct
// @param x:Number X分量
// @param y:Number Y分量
// @author maocy
// @version 150912
//==========================================================
export class SValue2 {
   // X参数
   x: number = 0;
   // Y参数
   y: number = 0;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   //============================================================
   public constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
   }

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //============================================================
   public isEmpty() {
      return (this.x == 0) && (this.y == 0);
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @return Boolean 是否相等
   //============================================================
   public equals(value) {
      return (this.x == value.x) && (this.y == value.y);
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @return Boolean 是否相等
   //============================================================
   public equalsData(x, y) {
      return (this.x == x) && (this.y == y);
   }

   //==========================================================
   // <T>接收数据内容。</T>
   //
   // @method
   // @param value:SValue2 二维数据
   //==========================================================
   public assign(value) {
      this.x = value.x;
      this.y = value.y;
   }

   //==========================================================
   // <T>设置最小数据。</T>
   //
   // @method
   //==========================================================
   public setMin() {
      this.x = Number.MIN_VALUE;
      this.y = Number.MIN_VALUE;
   }

   //==========================================================
   // <T>设置最大数据。</T>
   //
   // @method
   //==========================================================
   public setMax() {
      this.x = Number.MAX_VALUE;
      this.y = Number.MAX_VALUE;
   }

   //==========================================================
   // <T>设置数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   //==========================================================
   public set(x, y) {
      this.x = x;
      this.y = y;
   }

   //==========================================================
   // <T>设置数据内容。</T>
   //
   // @method
   // @param value:Number 内容
   //==========================================================
   public setAll(value) {
      this.x = value;
      this.y = value;
   }

   //==========================================================
   // <T>增加数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   //==========================================================
   public add(x, y) {
      this.x += x;
      this.y += y;
   }

   //==========================================================
   // <T>乘以数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   //==========================================================
   public mul(x, y) {
      this.x *= x;
      this.y *= y;
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
      }
      return this;
   }

   //============================================================
   // <T>合并最小值。</T>
   //
   // @method
   // @param value:SValue2 二维数据
   //============================================================
   public mergeMin(value) {
      var o = this;
      o.x = Math.min(o.x, value.x);
      o.y = Math.min(o.y, value.y);
   }

   //============================================================
   // <T>合并最小值。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   //============================================================
   public mergeMin2(x, y) {
      var o = this;
      o.x = Math.min(o.x, x);
      o.y = Math.min(o.y, y);
   }

   //============================================================
   // <T>合并最大值。</T>
   //
   // @method
   // @param value:SValue2 二维数据
   //============================================================
   public mergeMax(value) {
      var o = this;
      o.x = Math.max(o.x, value.x);
      o.y = Math.max(o.y, value.y);
   }

   //============================================================
   // <T>合并最大值。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   //============================================================
   public mergeMax2(x, y) {
      var o = this;
      o.x = Math.max(o.x, x);
      o.y = Math.max(o.y, y);
   }

   //==========================================================
   // <T>获得长度。</T>
   //
   // @method
   // @return Number 长度
   //==========================================================
   public length(value) {
      var cx = this.x - value.x;
      var cy = this.y - value.y;
      return Math.sqrt(cx * cx + cy * cy);
   }

   //==========================================================
   // <T>获得长度。</T>
   //
   // @method
   // @return Number 长度
   //==========================================================
   public length2(x, y) {
      var cx = this.x - x;
      var cy = this.y - y;
      return Math.sqrt(cx * cx + cy * cy);
   }

   //==========================================================
   // <T>获得绝对值。</T>
   //
   // @method
   // @return Number 绝对值
   //==========================================================
   public absolute() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
   }

   //============================================================
   // <T>获得负数据内容。</T>
   //
   // @method
   // @param value:SValue2 数据内容
   // @return SValue2 数据内容
   //============================================================
   public negative(value) {
      // 生成内容
      var result: SValue2 = null;
      if (value) {
         result = value;
      } else {
         result = new (this.constructor as any)();
      }
      // 设置内容
      result.x = -this.x;
      result.y = -this.y;
      return result;
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @method
   // @param value:String 字符串
   //============================================================
   public parse(value) {
      var items = value.split(',')
      if (items.length == 2) {
         this.x = parseFloat(items[0]);
         this.y = parseFloat(items[1]);
      } else {
         throw new FError(this, "Parse value failure. (value={1})", value);
      }
   }

   //==========================================================
   // <T>获得显示内容。</T>
   //
   // @return String 字符串
   //==========================================================
   public toDisplay() {
      var x = RFloat.format(this.x);
      var y = RFloat.format(this.y);
      return x + ',' + y;
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //==========================================================
   public toString() {
      return this.x + ',' + this.y;
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
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   public unserialize(input, dataCd) {
      switch (dataCd) {
         case EDataType.Int32:
            this.x = input.readInt32();
            this.y = input.readInt32();
            break;
         case EDataType.Float32:
            this.x = input.readFloat();
            this.y = input.readFloat();
            break;
         case EDataType.Float64:
            this.x = input.readDouble();
            this.y = input.readDouble();
            break;
      }
   }
}
