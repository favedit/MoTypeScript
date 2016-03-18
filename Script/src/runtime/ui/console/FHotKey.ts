import {FObject} from '../../common/lang/FObject';

//===========================================================
// <T>热键。</T>
//===========================================================
export class FHotKey extends FObject {
   public hotkeyHandler = null;
   public hotkeyMap = {};
   public cmdHotkeyMap = {};
   public _hotkeysEnabled = true;
   protected _valid;
   
   public constructor(){
      super();
      this._valid = false;
   }

   public enable() {
   }
   
   public disable() {
   }
}
