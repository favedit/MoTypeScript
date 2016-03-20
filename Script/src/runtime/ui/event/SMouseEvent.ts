import {SEvent} from '../common/lang/SEvent';
import {RHtml} from '../utility/RHtml';
import {EMouseButton} from './EMouseButton';

//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
export class SMouseEvent extends SEvent {
   //..........................................................
   // @attribute
   public button = null;
   public mouseLeft = false;
   public mouseMiddle = false;
   public mouseRight = false;
   public altKey = false;
   public ctrlKey = false;
   public x = 0;
   public y = 0;
   public offsetX = 0;
   public offsetY = 0;
   public clientX = 0;
   public clientY = 0;
   public deltaX = 0;
   public deltaY = 0;
   public deltaZ = 0;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(hEvent) {
      if (!hEvent) {
         hEvent = window.event;
      }
      //var hEvent = this.hSource = RHtml.eventSource(hEvent);
      //if (hEvent) {
         //this.source = hEvent.__linker;
      //}
      this.button = hEvent.button;
      this.mouseLeft = (hEvent.button == EMouseButton.Left);
      this.mouseMiddle = (hEvent.button == EMouseButton.Middle);
      this.mouseRight = (hEvent.button == EMouseButton.Right);
      this.altKey = hEvent.altKey;
      this.ctrlKey = hEvent.ctrlKey;
      //if (MO.RBrowser.isBrowser(MO.EBrowser.FireFox)) {
      // this.x = hEvent.pageX;
      // this.y = hEvent.pageY;
      // this.offsetX = hEvent.layerX;
      // this.offsetY = hEvent.layerY;
      //} else {
      this.x = hEvent.x;
      this.y = hEvent.y;
      this.offsetX = hEvent.offsetX;
      this.offsetY = hEvent.offsetY;
      //}
      this.clientX = hEvent.clientX;
      this.clientY = hEvent.clientY;
      this.deltaX = hEvent.deltaX;
      this.deltaY = hEvent.deltaY;
      this.deltaZ = hEvent.deltaZ;
   }
}
