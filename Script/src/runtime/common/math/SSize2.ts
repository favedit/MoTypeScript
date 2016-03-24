import {FError} from '../lang/FError';
import {DataTypeEnum} from '../lang/DataTypeEnum';
import {RClass} from '../reflect/RClass';

//==========================================================
// <T>二维尺寸结构。</T>
//
// @struct
// @param width:Number 宽度
// @param height:Number 高度
// @author maocy
// @version 150101
//==========================================================
export class SSize2 {
   //..........................................................
   // @attribute
   public width: number = 0;
   public height: number = 0;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param l:width:Number 宽度
   // @param t:height:Number 高度
   //============================================================
   constructor(width: number = 0, height: number = 0) {
      this.width = width;
      this.height = height;
   }

   //============================================================
   // <T>判断内容是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //============================================================
   public isEmpty() {
      return (this.width == 0) && (this.height == 0);
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @param width:Number 宽度
   // @param height:Number 高度
   // @return Boolean 是否相等
   //============================================================
   public equalsData(width, height) {
      if (this.width != width) {
         return false;
      }
      if (this.height != height) {
         return false;
      }
      return true;
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @param p:value:SSize2 尺寸
   // @return Boolean 是否相等
   //============================================================
   public equals(p) {
      if (this.width != p.width) {
         return false;
      }
      if (this.height != p.height) {
         return false;
      }
      return true;
   }

   //============================================================
   // <T>计算平方值。</T>
   //
   // @method
   // @return Number 平方值;
   //============================================================
   public square() {
      return this.width * this.height;
   }

   //============================================================
   // <T>接收对象数据。</T>
   //
   // @param v:value:SSize2 二维尺寸
   //============================================================
   public assign(v) {
      this.width = v.width;
      this.height = v.height;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param w:width:Number 宽度
   // @param h:height:Number 高度
   //============================================================
   public set(w, h) {
      var o = this;
      o.width = w;
      o.height = h;
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param output:FByteStream 数据流
   //==========================================================
   public serialize(output) {
      var o = this;
      output.writeFloat(o.width);
      output.writeFloat(o.height);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   public unserialize(input, dataCd) {
      var o = this;
      if (!dataCd) {
         dataCd = DataTypeEnum.Float16;
      }
      o.width = input.readData(dataCd);
      o.height = input.readData(dataCd);
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @param v:value:String 字符串
   //============================================================
   public parse(v) {
      var o = this;
      var r = v.split(',')
      if (r.length == 2) {
         o.width = parseInt(r[0]);
         o.height = parseInt(r[1]);
      } else {
         throw new FError(o, "Parse value failure. (value={1})", v);
      }
   }

   //============================================================
   // <T>获得显示内容。</T>
   //
   // @return String 字符串
   //============================================================
   public toDisplay() {
      var o = this;
      return o.width + 'x' + o.height;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      var o = this;
      return o.width + ',' + o.height;
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      var o = this;
      o.width = null;
      o.height = null;
   }

   //============================================================
   // <T>获得运行信息。</T>
   //
   // @return String 运行信息
   //============================================================
   public dump() {
      var o = this;
      return RClass.dump(o) + ' [' + o.width + ',' + o.height + ']';
   }
}
