import {SEvent} from '../../common/lang/SEvent';
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
   public attachEvent(event) {
      //var hs = o.hSource = MO.RHtml.eventSource(event);
      var hs = null;
      if (hs) {
         this.source = hs.__linker;
      }
      this.button = event.button;
      this.mouseLeft = (event.button == EMouseButton.Left);
      this.mouseMiddle = (event.button == EMouseButton.Middle);
      this.mouseRight = (event.button == EMouseButton.Right);
      this.altKey = event.altKey;
      this.ctrlKey = event.ctrlKey;
      //if (MO.RBrowser.isBrowser(MO.EBrowser.FireFox)) {
      this.x = event.pageX;
      this.y = event.pageY;
      this.offsetX = event.layerX;
      this.offsetY = event.layerY;
      //} else {
      this.x = event.x;
      this.y = event.y;
      this.offsetX = event.offsetX;
      this.offsetY = event.offsetY;
      //}
      this.clientX = event.clientX;
      this.clientY = event.clientY;
      this.deltaX = event.deltaX;
      this.deltaY = event.deltaY;
      this.deltaZ = event.deltaZ;
   }
}
