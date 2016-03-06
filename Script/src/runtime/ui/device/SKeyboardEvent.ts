import {SEvent} from '../../common/lang/SEvent';

//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class SKeyboardEvent extends SEvent {
   //..........................................................
   // @attribute
   altKey = false;
   shiftKey = false;
   ctrlKey = false;
   keyCode = 0;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param p:event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(p) {
      var o = this;
      o.altKey = p.altKey;
      o.shiftKey = p.shiftKey;
      o.ctrlKey = p.ctrlKey;
      o.keyCode = p.keyCode;
   }

   //==========================================================
   // <T>取消处理。</T>
   //
   // @method
   //==========================================================
   public cancel() {
      var o = this;
      o.hEvent.returnValue = false;
   }
}
