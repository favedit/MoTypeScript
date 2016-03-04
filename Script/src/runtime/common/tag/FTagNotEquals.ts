import {EResult} from '../lang/EResult';
import {FTag} from './FTag';

//==========================================================
// <T>标签判断真类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
export class FTagNotEquals extends FTag {
   _trimLeft = true;
   _source = null;
   _value = null;

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   // @param p:context:FTagContext 环境
   // @return EResult 处理结果
   //==========================================================
   public onBegin(p) {
      var o = this;
      var r = true;
      var s = p.get(o._source);
      var vs = o._value.split('|');
      var c = vs.length;
      for (var i = 0; i < c; i++) {
         var v = vs[i]
         if (s == v) {
            r = false;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }

   //==========================================================
   // <T>设置属性值。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param v:level:Integer 内容
   //==========================================================
   public set(n, v) {
      var o = this;
      switch (n) {
         case 'source':
            o._source = v;
            return;
         case 'value':
            o._value = v;
            return;
      }
      super.set(n, v);
   }

   //==========================================================
   //<T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   public toString() {
      var o = this;
      return 'source=' + o._source + ', value=' + o._value;
   }
}
