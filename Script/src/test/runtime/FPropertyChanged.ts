import {SAccessEvent} from '../../runtime/common/lang/SAccessEvent';
import {EDataType} from '../../runtime/common/lang/EDataType';
import {EAccess} from '../../runtime/common/lang/EAccess';
import {AProperty} from '../../runtime/common/reflect/AProperty';
import * as mo from '../../index';
mo.runtime.common.RRuntime.namespace(mo, 'mo');

export class FPropertyChanged {

   @AProperty("set_name", 'onFieldChanged1', EDataType.Float32)
   public name = null;

   @AProperty(null, 'onFieldChanged2')
   public value: string = null;

   public onFieldChanged1(sender, event: SAccessEvent) {
      console.log(sender, event.oldValue + " 1-> " + event.value);
   }

   public onFieldChanged2(sender, event: SAccessEvent) {
      console.log(sender, event.oldValue + " 2-> " + event.value);
   }
}

// var value = new FPropertyChanged();
// value.name = "asd";
// value.name = "das";
// value.value = "gagffsdg";
// console.log(value);
