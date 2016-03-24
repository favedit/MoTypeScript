import {Fatal} from '../lang/Fatal';
import {RClass} from '../reflect/RClass';

//==========================================================
// <T>三维尺寸结构。</T>
//
// @struct
// @param width:Number 宽度
// @param height:Number 高度
// @param deep:Number 深度
// @author maocy
// @version 150101
//==========================================================
export class SSize3 {
   // @attribute
   protected width: number = 0;
   protected height: number = 0;
   protected deep: number = 0;

   //============================================================
   // <T>构造处理。</T>
   //
   // @method
   // @param width:Number 宽度
   // @param height:Number 高度
   // @param deep:Number 深度
   //============================================================
   constructor(width: number = 0, height: number = 0, deep: number = 0) {
      this.width = width;
      this.height = height;
      this.deep = deep;
   }

   //============================================================
   // <T>接收对象数据。</T>
   //
   // @param v:value:SSize3 三维尺寸
   //============================================================
   public assign(v) {
      this.width = v.width;
      this.height = v.height;
      this.deep = v.deep;
   }

   //============================================================
   // <T>设置数据内容。</T>
   //
   // @param w:width:Number 宽度
   // @param h:height:Number 高度
   // @param d:deep:Number 深度
   //============================================================
   public set(w, h, d) {
      this.width = w;
      this.height = h;
      this.deep = d;
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @param v:value:String 字符串
   //============================================================
   public parse(v) {
      var o = this;
      var r = v.split(',')
      if (r.length == 3) {
         o.width = parseInt(r[0]);
         o.height = parseInt(r[1]);
         o.deep = parseInt(r[2]);
      } else {
         throw new Fatal(o, "Parse value failure. (value={1})", v);
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      var o = this;
      return o.width + ',' + o.height + ',' + o.deep;
   }

   //============================================================
   // <T>获得运行信息。</T>
   //
   // @return String 运行信息
   //============================================================
   public dump() {
      var o = this;
      return RClass.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
   }
}
