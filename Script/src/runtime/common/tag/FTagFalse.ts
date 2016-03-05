import {EResult} from '../lang/EResult';
import {RBoolean} from '../lang/RBoolean';
import {FTagContext} from './FTagContext';
import {FTag} from './FTag';

//==========================================================
// <T>标签判断非类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagFalse extends FTag {
   public trimLeft = true;
   public source = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param context  环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(context: FTagContext): EResult {
      var value = context.get(this.source);
      return RBoolean.parse(value) ? EResult.Skip : EResult.Continue;
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
      return 'source=' + this.source;
   }
}
