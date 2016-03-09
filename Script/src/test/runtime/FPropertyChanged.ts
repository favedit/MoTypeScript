import {SAccessEvent} from '../../runtime/common/lang/SAccessEvent';
import {EDataType} from '../../runtime/common/lang/EDataType';
import {EAccess} from '../../runtime/common/lang/EAccess';
import {AProperty} from '../../runtime/common/reflect/AProperty';
import * as mo from '../../index';
mo.runtime.common.RRuntime.namespace(mo, 'mo');

class Property{
   
   
}

class ReadonlyProperty{
   
   constructor(value){
      
   }
  get(){
     
  }

    
  
    
}



export class FPropertyChanged {
   
   public asdf:ReadonlyProperty;
   
      @AProperty("set_name", EAccess.GetSet, 'onFieldChanged1', EDataType.Float32)
   private _name;
   
   get name (){
      
   }
   


   public name = null;

   @AProperty(null, EAccess.GetSet, 'onFieldChanged2')
   public value: string = null;

   public test: string = null;

   public onFieldChanged1(sender, event: SAccessEvent) {
      console.log(sender, event.oldValue + " 1-> " + event.value);
   }

   public onFieldChanged2(sender, event: SAccessEvent) {
      console.log(sender, event.oldValue + " 2-> " + event.value);
   }
}

debugger
var value = new FPropertyChanged();
value.name = "asd";
value.name = "das";
value.value = "gagffsdg";
console.log(value);


var aproperty[] = RClass.get(FPropertyChanged).anntioanns(AProperty);
aproperty[0].name = ''
aproperty[0].name = ''

toJson(){
   
   var r = new Object();
var aproperty[] = RClass.get(FPropertyChanged).anntioanns(AProperty);
for(aproperty : aproperty[]){
   r[aproperty.name] = 'sdf';
}
aproperty[0].name = ''
aproperty[0].name = ''
}
