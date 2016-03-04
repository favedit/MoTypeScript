import {FObject} from '../../common/lang/FObject';

//==========================================================
// <T>环境信息。</T>
//
// @class
// @author maocy
// @version 150606
//==========================================================
export class FEnvironment extends FObject {
   // @attribute
   //_name  = MO.Class.register(o, new MO.AGetSet('_name'));
   protected _name: string = null;
   //_value = MO.Class.register(o, new MO.AGetSet('_value'));
   protected _value: string = null;

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   //==========================================================
   public get name() {
      return this._name;
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @method
   //==========================================================
   public get value() {
      return this._value;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   //==========================================================
   public set(name, value) {
      this._name = name;
      this._value = value;
   }
}
