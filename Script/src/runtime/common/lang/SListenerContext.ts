import {RMethod} from '../reflect/RMethod';

//==========================================================
// <T>监听环境。</T>
//
// @struct
// @author maocy
// @version 160306
//==========================================================
export class SListenerContext {
   // 发送者
   public sender: any = null;
   // 拥有者
   public owner: any = null;
   // 参数
   public parameter1: any = null;
   public parameter2: any = null;
   public parameter3: any = null;
   public parameter4: any = null;
   public parameter5: any = null;
   public parameter6: any = null;
   public parameter7: any = null;
   public parameter8: any = null;
   public parameter9: any = null;
   // 回调函数
   public callback: Function = null;

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   public process() {
      this.callback.call(this.owner, this.sender,
         this.parameter1, this.parameter2, this.parameter3, this.parameter4, this.parameter5,
         this.parameter6, this.parameter7, this.parameter8, this.parameter9);
   }

   //==========================================================
   // <T>回收处理。</T>
   //==========================================================
   free: Function = RMethod.structFree;

   //==========================================================
   // <T>释放处理。</T>
   //==========================================================
   dispose: Function = RMethod.structDispose;
}
