import {AccessEvent} from '../../runtime/common/lang/AccessEvent';
import {DataTypeEnum} from '../../runtime/common/lang/DataTypeEnum';
import {AccessEnum} from '../../runtime/common/lang/AccessEnum';
import {Property} from '../../runtime/common/reflect/Property';
import * as mo from '../../index';
mo.runtime.common.RuntimeUtil.namespace(mo, 'mo');

export class FPropertyChanged {

   @Property("set_name", DataTypeEnum.Float32, null, null, 'onFieldChanged1')
   public name = null;

   @Property("set_name", DataTypeEnum.Float32, null, null, 'onFieldChanged2')
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
