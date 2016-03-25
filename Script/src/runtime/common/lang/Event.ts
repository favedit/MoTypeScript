import {Struct} from './Struct';

//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class Event extends Struct {
   // 代码
   public code: string;
   // 发送者
   public sender: any;
   //..........................................................
   // @attribute
   // // @attribute
   // public annotation = null;
   // // @attribute
   // public listener = null;
   // public source = null;
   // // @attribute
   // public hEvent = null;
   // public hSender = null;
   // public hSource = null;
   // // @attribute
   // public result: boolean = false;
   // //..........................................................
   // // @method
   // public ohProcess = null;
   // public onProcess = null;
   // // @method
   // public process = null;

   public constructor(sender?: any) {
      super();
      // 构造处理
      this.sender = sender;
   }
}
