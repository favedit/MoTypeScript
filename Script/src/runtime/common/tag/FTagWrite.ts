import {EResult} from '../lang/EResult';
import {FTagContext} from './FTagContext';
import {FTag} from './FTag';

//==========================================================
// <T>标签输出类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagWrite extends FTag {
   //..........................................................
   // @attribute
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
      context.write(value);
      return EResult.Skip;
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
