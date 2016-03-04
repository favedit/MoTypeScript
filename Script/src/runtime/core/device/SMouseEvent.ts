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
   button = null;
   mouseLeft = false;
   mouseMiddle = false;
   mouseRight = false;
   altKey = false;
   ctrlKey = false;
   x = 0;
   y = 0;
   offsetX = 0;
   offsetY = 0;
   clientX = 0;
   clientY = 0;
   deltaX = 0;
   deltaY = 0;
   deltaZ = 0;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param event:HtmlEvent 页面事件
   //==========================================================
   public attachEvent(event) {
      var o = this;
      //var hs = o.hSource = MO.RHtml.eventSource(event);
      var hs = null;
      if (hs) {
         o.source = hs.__linker;
      }
      o.button = event.button;
      o.mouseLeft = (event.button == EMouseButton.Left);
      o.mouseMiddle = (event.button == EMouseButton.Middle);
      o.mouseRight = (event.button == EMouseButton.Right);
      o.altKey = event.altKey;
      o.ctrlKey = event.ctrlKey;
      //if (MO.RBrowser.isBrowser(MO.EBrowser.FireFox)) {
      o.x = event.pageX;
      o.y = event.pageY;
      o.offsetX = event.layerX;
      o.offsetY = event.layerY;
      //} else {
      o.x = event.x;
      o.y = event.y;
      o.offsetX = event.offsetX;
      o.offsetY = event.offsetY;
      //}
      o.clientX = event.clientX;
      o.clientY = event.clientY;
      o.deltaX = event.deltaX;
      o.deltaY = event.deltaY;
      o.deltaZ = event.deltaZ;
   }
}
