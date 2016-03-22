import {ESamplerFilter} from '../../../runtime/graphic/base/ESamplerFilter';
import {FPhongMaterial as FBasePhongMaterial} from '../../../runtime/graphic/material/FPhongMaterial';

//==========================================================
// <T>材质。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
export class FPhongMaterial extends FBasePhongMaterial {
   public ready = false;

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady() {
      return this.ready;
   }

   //==========================================================
   // <T>加载材质资源。</T>
   //
   // @param resource 材质资源
   //==========================================================
   public loadResource(resource) {
      var context = this._graphicContext;
      var textures = resource.textures;
      var count = textures.count();
      for (var i = 0; i < count; i++) {
         var texture = textures.at(i);
         var textureResource = texture.textureResource;
         var rtexture = context.createFlatTexture();
         rtexture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
         rtexture.setWrapCd(ESamplerFilter.Repeat, ESamplerFilter.Repeat);
         rtexture.upload(textureResource.image);
         this.textures.set(texture.code, rtexture);
      }
      //this._guid = resource.guid();
      //this._resource = resource;
      //this._info.calculate(resource.info());
      //this._dirty = true;
      this.ready = true;
   }
}