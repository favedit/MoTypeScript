import {FLoggerAnnotation} from './FLoggerAnnotation';
import {RClass} from './RClass';

//==========================================================
// <T>日志描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function ALogger() {
   return function(target, name, descriptor) {
      // 注册描述器
      var annotation: FLoggerAnnotation = new FLoggerAnnotation(name, descriptor.value);
      RClass.registerAnnotation(target, annotation);
      // 函数跟踪
      var callback = descriptor.value;
      //descriptor.value = function(...parameters: Array<any>) {
      descriptor.value = function() {
         return annotation.invoke(this, (arguments as any));
      }
   }
}
