import {SObject} from './SObject';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class SEvent extends SObject {
   //..........................................................
   // @attribute
   public code = null;
   // @attribute
   public annotation = null;
   // @attribute
   public listener = null;
   public sender = null;
   public source = null;
   // @attribute
   public hEvent = null;
   public hSender = null;
   public hSource = null;
   // @attribute
   public result: boolean = false;
   //..........................................................
   // @method
   public ohProcess = null;
   public onProcess = null;
   // @method
   public process = null;

   // @method
   public constructor(sender: any = null) {
      super();
      this.sender = sender;
   }
}
