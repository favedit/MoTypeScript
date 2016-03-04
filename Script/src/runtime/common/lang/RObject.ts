import {RRuntime} from '../RRuntime'
import {RClass} from '../reflect/RClass'
import {FError} from './FError'

//==========================================================
// <T>对象管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class RObject {
   //==========================================================
   // <T>获得第一个非空对象。</T>
   //
   // @method
   // @param v:values:Object[] 对象集合
   // @return Object 非空对象
   //==========================================================
   public static nvl(...values: Array<any>) {
      var count = values.length;
      for (var n: number = 0; n < count; n++) {
         if (values[n] != null) {
            return values[n];
         }
      }
      return null;
   }

   //==========================================================
   // <T>生成一个克隆对象。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @return Object 克隆对象
   //==========================================================
   public static clone(o) {
      var r = new o.constructor();
      for (var n in o) {
         var v = o[n];
         if (v != null) {
            if (!RClass.isBaseType(v.constructor)) {
               v = RObject.clone(v);
            }
         }
         r[n] = v;
      }
      return r;
   }

   //==========================================================
   // <T>复制一个对象。</T>
   //
   // @method
   // @param s:source:Object 来源对象
   // @param t:target:Object 目标对象
   //==========================================================
   public static copy(s, t) {
      if ((s != null) && (t != null)) {
         for (var n in s) {
            var v = s[n];
            if (v != null) {
               var c: any = (v as any).constructor;
               if (!RClass.isBaseType(c)) {
                  if (t[n] == null) {
                     t[n] = new c();
                  }
                  RObject.copy(v, t[n]);
               }
            }
            t[n] = v;
         }
      }
   }

   //==========================================================
   // <T>释放一个对象。</T>
   // <P>不递归释放，只清空当前层属性。</P>
   //
   // @method
   // @param item:Object 对象
   //==========================================================
   public static free(item) {
      if (item) {
         if (RRuntime.isDebug()) {
            // 调试模式
            for (var name in item) {
               // 基础类型
               if ((name == '__base') || (name == '__inherits') || (name == '__class')) {
                  item[name] = null;
                  continue;
               }
               // 检查类型
               var value = item[name];
               if (value != null) {
                  if (!RClass.isBaseType(value.constructor)) {
                     throw new FError(this, 'Free object is not base object.');
                  }
                  item[name] = null;
               }
            }
         } else {
            // 运行模式
            for (var name in item) {
               item[name] = null;
            }
         }
      }
   }

   //==========================================================
   // <T>释放一个对象。</T>
   //
   // @method
   // @param item:Object 对象
   // @param flag:Boolean 标志
   //==========================================================
   public static dispose(item, flag: boolean = false) {
      if (item) {
         if (!item.__dispose) {
            item.dispose(flag);
            item.__dispose = true;
         } else {
            throw new FError(this, 'Object has disposed.');
         }
      }
      return null;
   }

   //==========================================================
   // <T>释放一个对象。</T>
   // <P>递归释放所有对象。</P>
   //
   // @method
   // @param item:Object 对象
   //==========================================================
   public static release(item) {
      if (item) {
         for (var name in item) {
            var value = item[name];
            if (typeof (value) == 'Object') {
               this.release(value)
            }
            item[name] = null;
         }
      }
      return null;
   }
}
