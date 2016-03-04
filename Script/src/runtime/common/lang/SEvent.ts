//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class SEvent {
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
   //..........................................................
   // @method
   public ohProcess = null;
   public onProcess = null;
   // @method
   public process = null;

   // @method
   public constructor(sender: any = null) {
      this.sender = sender;
   }

   //free = sk.common.lang.RObject.fre . RMethod.freeStruct;
   public free() {
   }

   //dispose = sk.common.reflect.RMethod.disposeStruct;
   public dispose() {
   }
}
