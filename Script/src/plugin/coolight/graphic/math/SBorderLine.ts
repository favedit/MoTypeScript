import {FError} from '../../../../runtime/common/lang/FError';

//==========================================================
// <T>直线样式。</T>
//
// @struct
// @param width:Number 宽度
// @param style:String 样式
// @param color:String 颜色
// @author maocy
// @version 150611
//==========================================================
export class SBorderLine {
   //..........................................................
   // @attribute
   protected width: number = 0;
   protected style: string = null;
   protected color: string = null;

   //============================================================
   // <T>构造处理。</T>
   //============================================================
   constructor(width: number = 1, style: string = 'solid', color: string = '#FFFFFF') {
      this.width = width;
      this.style = style;
      this.color = color;
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @param source:String 字符串
   //============================================================
   public parse(source) {
      var o = this;
      var items = source.split(' ')
      if (items.length == 3) {
         o.width = parseInt(items[0]);
         o.style = items[1];
         o.color = items[2];
      } else {
         throw new FError(o, "Parse value failure. (source={1})", source);
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   public toString() {
      var o = this;
      return o.width + ' ' + o.style + ' ' + o.color;
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   public dispose() {
      var o = this;
      o.width = null;
      o.style = null;
      o.color = null;
   }
}
