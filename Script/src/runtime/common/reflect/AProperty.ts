import {EDataType} from '../lang/EDataType';
import {FPropertyAnnotation} from './FPropertyAnnotation';
import {RClass} from './RClass';

//==========================================================
// <T>实例关联描述类。</T>
//
// @param clazz 类对象
// @author maocy
// @version 160227
//==========================================================
export function AProperty(dataName: String = null, dataCd: EDataType = EDataType.Unknown, dataClass: any = null, dataDefault: any = null) {
   return function(target, name): void {
      var annotation: FPropertyAnnotation = new FPropertyAnnotation(name, dataName, dataCd, dataClass, dataDefault);
      RClass.registerAnnotation(target, annotation);
   }
}
