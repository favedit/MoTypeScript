import {FG3dObject} from './FG3dObject';

//==========================================================
// <T>渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FG3dShader extends FG3dObject {
   //..........................................................
   // @attribute
   //o._source = MO.Class.register(o, new MO.AGetter('_source'));
   protected _source: string = null;
   //..........................................................
   // @method
   //o.upload = MO.Method.virtual(o, 'upload');
   public source() {
      return this._source;
   }
}