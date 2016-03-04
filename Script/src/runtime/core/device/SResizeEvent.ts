import {SEvent} from '../../common/lang/SEvent';

//==========================================================
// <T>改变大小事件信息类。</T>
//
// @struct
// @author maocy
// @version 150213
//==========================================================
export class SResizeEvent extends SEvent {
   // @attribute
   width = null;
   height = null;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param p:event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(p) {
      var o = this;
      //var hs = o.hSource = MO.RHtml.eventSource(p);
      //if(hs){
      //   o.source = hs.__linker;
      //}
   }
}
