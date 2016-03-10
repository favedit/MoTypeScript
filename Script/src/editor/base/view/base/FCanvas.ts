import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>画板基类。</T>
//==========================================================
export class FCanvas extends FObject {

   public hDocument: HTMLDocument = null;

   public hPanel: HTMLElement = null;

   public hCanvas: HTMLCanvasElement = null;

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public createContext() {
   }
}