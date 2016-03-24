import {AccessEvent} from '../../runtime/common/lang/AccessEvent';
import {DataTypeEnum} from '../../runtime/common/lang/DataTypeEnum';
import {AccessEnum} from '../../runtime/common/lang/AccessEnum';
import {AProperty} from '../../runtime/common/reflect/AProperty';
import * as mo from '../../index';
mo.runtime.common.RuntimeUtil.namespace(mo, 'mo');

export class FPropertyChanged {

   @AProperty("set_name", 'onFieldChanged1', DataTypeEnum.Float32)
   public name = null;

   @AProperty(null, 'onFieldChanged2')
   public value: string = null;

   public onFieldChanged1(sender, event: AccessEvent) {
      console.log(sender, event.oldValue + " 1-> " + event.value);
   }

   public onFieldChanged2(sender, event: AccessEvent) {
      console.log(sender, event.oldValue + " 2-> " + event.value);
   }
}

// var value = new FPropertyChanged();
// value.name = "asd";
// value.name = "das";
// value.value = "gagffsdg";
// console.log(value);
