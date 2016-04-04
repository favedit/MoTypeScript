import {WglContext} from '../../../../plugin/cl3d/graphic/wgl/WglContext';
import {WglContextUtil} from '../../../../plugin/cl3d/graphic/wgl/WglContextUtil';
import {EventEnum} from '../../../../runtime/ui/EventEnum';
import {FCanvas as FBaseCanvas} from '../base/FCanvas';

//==========================================================
// <T>画板。</T>
//==========================================================
export class FCanvas extends FBaseCanvas {

   public graphicContent: WglContext;

   public constructor() {
      super();
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public setup(parameters) {
      super.setup(parameters);
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public createContext(parameters) {
      var hDocument = parameters.hDocument;
      var hPanel = parameters.hPanel;
      var size = parameters.size;
      // 创建画板
      var hCanvas = null;
      if (this.hCanvas) {
         hCanvas = this.hCanvas;
      } else {
         hCanvas = this.hCanvas = hDocument.createElement("CANVAS");
         hPanel.appendChild(hCanvas);
      }
      var hParent = hCanvas.parentElement;
      hCanvas.style.width = '100%';
      hCanvas.style.height = '100%';
      hCanvas.width = hParent.offsetWidth;
      hCanvas.height = hParent.offsetHeight;
      //hCanvas.width = size.width;
      //hCanvas.height = size.height;
      // 创建环境
      var context = WglContextUtil.create(hCanvas);
      // 设置事件
      this.attachEvent(hCanvas, EventEnum.MouseMove, this.onMouseMove);
      return context;
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public onMouseMove(sender, event) {
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public process() {
   }
}