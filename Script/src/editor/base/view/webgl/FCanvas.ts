import {FWglContext} from '../../../../plugin/cl3d/graphic/wgl/FWglContext';
import {FCanvas as FBaseCanvas} from '../base/FCanvas';

//==========================================================
// <T>画板。</T>
//==========================================================
export class FCanvas extends FBaseCanvas {

   public context: FWglContext = null;

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public createContext(parameters) {
      var hDocument = parameters.hDocument;
      var hPanel = parameters.hPanel;
      var size = parameters.size;
      // 创建画板
      var hCanvas = this.hCanvas = hDocument.createElement("CANVAS");
      hCanvas.width = size.width;
      hCanvas.height = size.height;
      hPanel.appendChild(hCanvas);
      // 创建环境
      var context = this.context = new FWglContext();
      context.linkCanvas(hCanvas);
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public process() {
   }
}