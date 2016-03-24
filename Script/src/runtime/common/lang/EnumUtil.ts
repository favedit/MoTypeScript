import {RClass} from '../reflect/RClass';
import {Fatal} from './Fatal';

//============================================================
// <T>枚举管理类。</T>
//
// @reference
// @author maocy
// @version 141230
//============================================================
export class EnumUtil {
   //============================================================
   // <T>是否含有当前内容。</T>
   //
   // @method
   //============================================================
   public static contains() {
   }

   //============================================================
   // <T>尝试获得枚举内容。</T>
   //
   // @method
   // @param instance:Object 枚举对象
   // @param value:Object 内容
   // @param defaultValue:Object 缺省内容
   //============================================================
   public static tryEncode(instance, value, defaultValue: any = null) {
      if (instance) {
         for (var name in instance) {
            if (name.toLowerCase() == value.toLowerCase()) {
               return instance[name];
            }
         }
      }
      return defaultValue;
   }

   //============================================================
   // <T>获得枚举内容。</T>
   //
   // @method
   // @param instance:Object 枚举对象
   // @param value:Object 内容
   //============================================================
   public static encode(instance, value) {
      var o = this;
      var result = o.tryEncode(instance, value);
      if (result == null) {
         throw new Fatal(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value);
      }
      return result;
   }

   //============================================================
   // <T>尝试获得枚举描述。</T>
   //
   // @method
   // @param instance:Object 枚举对象
   // @param value:Object 描述
   // @param defaultValue:Object 缺省描述
   //============================================================
   public static tryDecode(instance, value, defaultValue: any = null) {
      if (instance) {
         for (var name in instance) {
            if (instance[name] == value) {
               return name;
            }
         }
      }
      return defaultValue;
   }

   //============================================================
   // <T>获得枚举描述。</T>
   //
   // @method
   // @param instance:Object 枚举对象
   // @param value:Object 描述
   //============================================================
   public static decode(instance, value) {
      var result = this.tryDecode(instance, value);
      if (result == null) {
         throw new Fatal(this, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value);
      }
      return result;
   }
}
