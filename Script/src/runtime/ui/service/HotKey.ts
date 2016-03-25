import {ObjectBase} from '../../common/lang/ObjectBase';

//===========================================================
// <T>热键。</T>
//===========================================================
export class HotKey extends ObjectBase {
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
