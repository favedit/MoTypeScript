import {EAccess} from '../lang/EAccess';
import {EDataType} from '../lang/EDataType';
import {SAccessEvent} from '../lang/SAccessEvent';
import {FPropertyAnnotation} from './FPropertyAnnotation';
import {RMemory} from '../RMemory';
import {RClass} from './RClass';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function AProperty(
      dataName: String = null,
      dataChanged: string = 'onFieldChanged',
      dataCd: EDataType = EDataType.Object,
      dataClass: any = null,
      dataDefault: any = null) {
   return function(target: any, name: string): void {
      // 注册描述器
      var annotation: FPropertyAnnotation = new FPropertyAnnotation(name, dataName, dataCd, dataClass, dataDefault);
      RClass.registerAnnotation(target, annotation);
      // 设置属性
      var propertyName: string = '__' + name;
      var descriptor: any = new Object();
      descriptor.get = function() {
         // 获得实例对象
         return this[propertyName];
      };
      descriptor.set = function(value: any) {
         // 设置实例内容
         var result: boolean = true;
         var resultValue: any = value;
         var oldValue: any = this[propertyName];
         if (dataChanged) {
            // 执行注册函数
            var event: SAccessEvent = RMemory.alloc(SAccessEvent);
            event.oldValue = oldValue;
            event.value = value;
            event.result = true;
            this[dataChanged].call(this, this, event);
            result = event.result;
            resultValue = event.value;
            RMemory.free(event);
         }
         if (result) {
            if (oldValue !== resultValue) {
               this[propertyName] = resultValue;
            }
         }
      };
      return descriptor;
   }
}
