import {FDictionary} from '../../../../runtime/common/lang/FDictionary';
import {FBaseMaterial} from './FBaseMaterial';

//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
export class FMaterial extends FBaseMaterial {
   // @attribute
   public dirty = true;
   // @attribute
   public textures = null;

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return 纹理集合
   //==========================================================
   public setTexture(code, texture) {
      var textures = this.textures;
      if (!textures) {
         textures = this.textures = new FDictionary();
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
      this.dirty = true;
   }
}
