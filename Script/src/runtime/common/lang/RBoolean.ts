import {EBoolean} from './EBoolean';
import {FError} from './FError';

//==========================================================
// <T>布尔操作的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class RBoolean {

   //==========================================================
   // <T>把布尔值转化为字符串。</T>
   //
   // @method
   // @param value:Boolean 布尔值
   // @return String 字符串
   //==========================================================
   public static format(value) {
      return value ? EBoolean.True : EBoolean.False;
   }

   //==========================================================
   // <T>解析字符串为布尔值。</T>
   //
   // @method
   // @param value:String 字符串
   // @return Boolean 布尔值
   //==========================================================
   public static parse(value) {
      if (value != null) {
         if (value.constructor == Boolean) {
            return value;
         } else if (value.constructor == String) {
            return (value == EBoolean.True);
         } else if (value.constructor == Number) {
            return value > 0;
         } else {
            throw new FError(this, 'Unknown type.');
         }
      }
      return false;
   }

   //==========================================================
   // <T>把布尔值转化为字符串。</T>
   //
   // @method
   // @param value:Boolean 布尔值
   // @param valueTrue:String 真字符串
   // @param valueFalse:String 假字符串
   // @return String 字符串
   //==========================================================
   public static toString(value, valueTrue: string = EBoolean.True, valueFalse: string = EBoolean.False) {
      return value ? valueTrue : valueFalse;
   }
}
