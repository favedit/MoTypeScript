import {EResult} from '../lang/EResult';
import {RString} from '../lang/RString';
import {FTag} from './FTag';

//==========================================================
// <T>标签类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagText extends FTag {
   // @attribute
   //_text    = MO.Class.register(o, new MO.AGetSet('_text'));
   _text: string = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(p) {
      var t = this._text;
      if (p._trimLeft) {
         if (RString.startsWith(t, '\r')) {
            t = t.substring(1);
         }
         if (RString.startsWith(t, '\n')) {
            t = t.substring(1);
         }
      }
      if (p._trimRight) {
         if (RString.endsWith(t, '\r')) {
            t = t.substring(0, t.length - 1);
         }
         if (RString.endsWith(t, '\n')) {
            t = t.substring(0, t.length - 1);
         }
      }
      p.write(t);
      return EResult.Skip;
   }

   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString(): string {
      return '{' + this._text + '}';
   }
}
