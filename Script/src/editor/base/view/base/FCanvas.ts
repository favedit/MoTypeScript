import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';
import {Control} from '../../../../plugin/dui/Control';

//==========================================================
// <T>画板基类。</T>
//==========================================================
export class FCanvas extends Control {

   public hDocument: HTMLDocument;

   public hPanel: HTMLElement;

   public hCanvas: HTMLCanvasElement;

   public graphicContent = null;

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public setup(parameters) {
      this.graphicContent = this.createContext(parameters);
   }

   //==========================================================
   // <T>创建环境。</T>
   //==========================================================
   public createContext(parameters): any {
      return null;
   }
}