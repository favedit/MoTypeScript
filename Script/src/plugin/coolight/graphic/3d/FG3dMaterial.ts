import {FDictionary} from '../../../../runtime/common/lang/FDictionary';
import {FG3dBaseMaterial} from './FG3dBaseMaterial';

//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FG3dMaterial extends FG3dBaseMaterial {
   // @attribute
   protected _dirty = true;
   // @attribute
   //_textures = MO.Class.register(o, new MO.AGetter('_textures'))
   protected _textures = null;

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return 纹理集合
   //==========================================================
   public setTexture(code, texture) {
      var o = this;
      var textures = o._textures;
      if (!textures) {
         textures = o._textures = new FDictionary();
      }
      textures.set(code, texture);
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return 纹理集合
   //==========================================================
   public update() {
      this._dirty = true;
   }
}
