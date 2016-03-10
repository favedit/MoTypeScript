import {FObject} from '../../../../runtime/common/lang/FObject';

//==========================================================
// <T>画板基类。</T>
//==========================================================
export class FCanvas extends FObject {

   public hDocument: HTMLDocument = null;

   public hPanel: HTMLElement = null;

   public hCanvas: HTMLCanvasElement = null;

   public content = null;

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public setup(parameters) {
      this.content = this.createContext(parameters);
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public createContext(parameters): any {
      return null;
   }
}