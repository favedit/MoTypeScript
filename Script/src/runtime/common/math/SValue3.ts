import {EDataType} from '../lang/EDataType';
import {FError} from '../lang/FError';
import {RFloat} from '../lang/RFloat';

//==========================================================
// <T>三维数据。</T>
//
// @struct
// @author maocy
// @version 150208
//==========================================================
export class SValue3 {
   //..........................................................
   // @attribute
   x: number = 0;
   y: number = 0;
   z: number = 0;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //============================================================
   constructor(x: number = 0, y: number = 0, z: number = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
   }

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //============================================================
   public isEmpty() {
      return (this.x == 0) && (this.y == 0) && (this.z == 0);
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @return Boolean 是否相等
   //============================================================
   public equals(value) {
      return (this.x == value.x) && (this.y == value.y) && (this.z == value.z);
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @return Boolean 是否相等
   //============================================================
   public equalsData(x, y, z) {
      var o = this;
      return (o.x == x) && (o.y == y) && (o.z == z);
   }

   //==========================================================
   // <T>接收数据内容。</T>
   //
   // @method
   // @param value:SValue3 三维数据
   //==========================================================
   public assign(value) {
      var o = this;
      o.x = value.x;
      o.y = value.y;
      o.z = value.z;
   }

   //==========================================================
   // <T>设置最小数据。</T>
   //
   // @method
   //==========================================================
   public setMin() {
      var o = this;
      o.x = o.y = o.z = Number.MIN_VALUE;
   }

   //==========================================================
   // <T>设置最大数据。</T>
   //
   // @method
   //==========================================================
   public setMax() {
      var o = this;
      o.x = o.y = o.z = Number.MAX_VALUE;
   }

   //==========================================================
   // <T>设置数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //==========================================================
   public set(x, y, z) {
      if (x != null) {
         this.x = x;
      }
      if (y != null) {
         this.y = y;
      }
      if (z != null) {
         this.z = z;
      }
   }

   //==========================================================
   // <T>设置数据内容。</T>
   //
   // @method
   // @param value:Number 内容
   //==========================================================
   public setAll(value) {
      if (value != null) {
         this.x = value;
         this.y = value;
         this.z = value;
      }
   }

   //==========================================================
   // <T>增加数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //==========================================================
   public add(x: number, y: number, z: number) {
      this.x += x;
      this.y += y;
      this.z += z;
   }

   //==========================================================
   // <T>增加数据内容。</T>
   //
   // @method
   // @param value:SVector3 方向
   //==========================================================
   public addValue3(value) {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
   }

   //==========================================================
   // <T>乘以数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //==========================================================
   public mul(x, y, z) {
      this.x *= x;
      this.y *= y;
      this.z *= z;
   }

   //==========================================================
   // <T>乘以数据内容。</T>
   //
   // @method
   // @param x:Number X分量
   // @param y:Number Y分量
   // @param z:Number Z分量
   //==========================================================
   public mulAll(value) {
      this.x *= value;
      this.y *= value;
      this.z *= value;
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
      }
   }

   //==========================================================
   // <T>获得长度。</T>
   //
   // @method
   // @return Number 绝对值
   //==========================================================
   public lengthTo(x, y, z) {
      var cx = this.x - x;
      var cy = this.y - y;
      var cz = this.z - z;
      return Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));
   }

   //==========================================================
   // <T>获得长度。</T>
   //
   // @method
   // @return Number 绝对值
   //==========================================================
   public lengthTo2(value) {
      var cx = this.x - value.x;
      var cy = this.y - value.y;
      var cz = this.z - value.z;
      return Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));
   }

   //==========================================================
   // <T>获得绝对值。</T>
   //
   // @method
   // @return Number 绝对值
   //==========================================================
   public absolute() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
   }

   //============================================================
   // <T>获得负数据内容。</T>
   //
   // @method
   // @param value:SValue3 数据内容
   // @return SValue3 数据内容
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
      this.y = input.readFloat();
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   public unserialize2(input, dataCd) {
      var o = this;
      switch (dataCd) {
         case EDataType.Int32:
            o.x = input.readInt32();
            o.y = input.readInt32();
            break;
         case EDataType.Float32:
            o.x = input.readFloat();
            o.y = input.readFloat();
            break;
         case EDataType.Float64:
            o.x = input.readDouble();
            o.y = input.readDouble();
            break;
         default:
            break;
      }
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   public unserialize3(input, dataCd) {
      var o = this;
      switch (dataCd) {
         case EDataType.Int32:
            o.x = input.readInt32();
            o.y = input.readInt32();
            o.z = input.readInt32();
            break;
         case EDataType.Float32:
            o.x = input.readFloat();
            o.y = input.readFloat();
            o.z = input.readFloat();
            break;
         case EDataType.Float64:
            o.x = input.readDouble();
            o.y = input.readDouble();
            o.z = input.readDouble();
            break;
      }
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @method
   // @param value:String 字符串
   //============================================================
   public parse(value) {
      var o = this;
      var items = value.split(',')
      if (items.length == 3) {
         o.x = parseFloat(items[0]);
         o.y = parseFloat(items[1]);
         o.z = parseFloat(items[2]);
      } else {
         throw new FError(o, "Parse value failure. (value={1})", value);
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
      var z = RFloat.format(this.z);
      return x + ',' + y + ',' + z;
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //==========================================================
   public toString() {
      return this.x + ',' + this.y + ',' + this.z;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      this.x = null;
      this.y = null;
      this.z = null;
   }
}
