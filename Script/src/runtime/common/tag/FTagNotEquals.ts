import {ResultEnum} from '../lang/ResultEnum';
import {FTagContext} from './FTagContext';
import {FTag} from './FTag';

//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagNotEquals extends FTag {
   public trimLeft = true;
   public source = null;
   public value = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param context  环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(context: FTagContext): ResultEnum {
      var result = true;
      var s = context.get(this.source);
      var vs = this.value.split('|');
      var c = vs.length;
      for (var i = 0; i < c; i++) {
         var v = vs[i]
         if (s == v) {
            result = false;
            break;
         }
      }
      return result ? ResultEnum.Continue : ResultEnum.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:level:Integer 内容
   //==========================================================
   public set(name, value) {
      switch (name) {
         case 'source':
            this.source = value;
            return;
         case 'value':
            this.value = value;
            return;
      }
      super.set(name, value);
   }

   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      return 'source=' + this.source + ', value=' + this.value;
   }
}
