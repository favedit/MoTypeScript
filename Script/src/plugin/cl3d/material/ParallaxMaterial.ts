import {AssertUtil} from '../../../runtime/common/AssertUtil';
import {SamplerFilterEnum} from '../../../runtime/graphic/base/SamplerFilterEnum';
import {PhongMaterial as BasePhongMaterial} from '../../../runtime/graphic/material/PhongMaterial';
import {MaterialTextureResource} from '../resource/MaterialTextureResource';
import {MaterialResource} from '../resource/MaterialResource';

//==========================================================
// <T>材质。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
export class ParallaxMaterial extends BasePhongMaterial {
   // 准备好
   public ready: boolean;
   // 材质资源
   public resource: MaterialResource;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.effectCode = "parallax.automatic";
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   public testReady(): boolean {
      return this.ready;
   }

   //==========================================================
   // <T>加载材质资源。</T>
   //
   // @param resource 材质资源
   //==========================================================
   public loadResource(resource: MaterialResource) {
      AssertUtil.debugNotNull(resource);
      var context = this.graphicContext;
      // 设置属性
      this.resource = resource;
      this.name = resource.name;
      this.label = resource.label;
      // 设置纹理
      var textures = resource.textures;
      var count = textures.count();
      for (var i = 0; i < count; i++) {
         var materialTextureResource: MaterialTextureResource = textures.at(i);
         var textureResource = materialTextureResource.textureResource;
         // 创建纹理
         var texture = null;
         if (materialTextureResource.typeName == 'Texture2d') {
            texture = context.createFlatTexture();
         } else if (materialTextureResource.typeName == 'TextureCube') {
            texture = context.createCubeTexture();
         }
         AssertUtil.debugNotNull(texture);
         texture.setFilterCd(SamplerFilterEnum.Linear, SamplerFilterEnum.Linear);
         texture.setWrapCd(SamplerFilterEnum.Repeat, SamplerFilterEnum.Repeat);
         texture.upload(textureResource.image);
         this.textures.set(materialTextureResource.code, texture);
      }
      //this._guid = resource.guid();
      //this._info.calculate(resource.info());
      //this._dirty = true;
      this.ready = true;
   }
}