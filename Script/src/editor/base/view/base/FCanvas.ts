import {ObjectBase} from '../../../../runtime/common/lang/ObjectBase';
import {Control} from '../../../../runtime/ui/Control';

//==========================================================
// <T>画板基类。</T>
//==========================================================
export class FCanvas extends Control {

   public hDocument: HTMLDocument;

   public hPanel: HTMLElement;

   public hCanvas: HTMLCanvasElement;

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