import {EScope} from '../lang/EScope';
import {RClass} from './RClass';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function ALinker(clazz: Function, scopeCd: EScope = EScope.Global, factory: any = null) {
   return function(target, name): any {
      // 设置描述器
      var descriptor: any = new Object();
      descriptor.get = function() {
         // 获得实例对象
         return RClass.getInstance(clazz);
      };
      descriptor.set = function(value) {
         // 设置实例内容
         RClass.setInstance(clazz, value);
      };
      return descriptor;
   }
}
