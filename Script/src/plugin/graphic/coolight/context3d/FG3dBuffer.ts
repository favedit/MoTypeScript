import {FG3dObject} from './FG3dObject';

//==========================================================
// <T>渲染缓冲。</T>
//
// @class
// @author maocy
// @history 150305
//==========================================================
export class FG3dBuffer extends FG3dObject {
   //..........................................................
   // @attribute
   //o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   protected _code: string = null;
   //o._data = MO.Class.register(o, new MO.AGetSet('_data'));
   protected _data = null;
   //..........................................................
   // @method
   //o.isValid = MO.Method.virtual(o, 'isValid');

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   public dispose() {
      // 释放属性集合
      this._data = null;
      // 父处理
      super.dispose();
   }
}
