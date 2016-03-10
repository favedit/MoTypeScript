import {FCanvas as FBaseCanvas} from '../base/FCanvas';
import {FWglContext} from '../../../../plugin/c3d/graphic/wgl/FWglContext';

//==========================================================
// <T>画板。</T>
//==========================================================
export class FCanvas extends FBaseCanvas {

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public createContext() {
      var hCanvas = this.hCanvas = <HTMLCanvasElement>this.hDocument.createElement("CANVAS");
   }
}