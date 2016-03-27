import {SamplerFilterEnum} from '../../../runtime/graphic/base/SamplerFilterEnum';
import {TextureFormatEnum} from '../../../runtime/graphic/material/TextureFormatEnum';
import {Texture} from '../../../runtime/graphic/material/Texture';
import {RenderTarget} from '../graphic/RenderTarget';
import {TechniquePass} from './TechniquePass';
import {Region} from '../base/Region';

//==========================================================
// <T>延迟数据渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class DeferredDataPass extends TechniquePass {
   // 渲染目标
   protected _renderTarget: RenderTarget;
   // 深度纹理
   public textureDepth: Texture;
   // 法线纹理
   public textureNormal: Texture;
   // 颜色纹理
   public textureColor: Texture;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      // 设置属性
      this.code = 'data';
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      var context = this._graphicContext;
      // 创建深度纹理
      var textureDepth: Texture = this.textureDepth = context.createFlatTexture();
      textureDepth.setFilterCd(SamplerFilterEnum.Linear, SamplerFilterEnum.Linear);
      textureDepth.setWrapCd(SamplerFilterEnum.ClampToEdge, SamplerFilterEnum.ClampToEdge);
      textureDepth.formatInternalCd = TextureFormatEnum.R32F;
      textureDepth.formatCd = TextureFormatEnum.RED;
      textureDepth.formatTypeCd = TextureFormatEnum.Float;
      textureDepth.update();
      this.outputTextures.set('depth', textureDepth);
      // 创建法线纹理
      var textureNormal: Texture = this.textureNormal = context.createFlatTexture();
      textureNormal.setFilterCd(SamplerFilterEnum.Linear, SamplerFilterEnum.Linear);
      textureNormal.setWrapCd(SamplerFilterEnum.ClampToEdge, SamplerFilterEnum.ClampToEdge);
      textureNormal.update();
      this.outputTextures.set('normal', textureNormal);
      // 创建颜色纹理
      var textureColor: Texture = this.textureColor = context.createFlatTexture();
      textureColor.setFilterCd(SamplerFilterEnum.Linear, SamplerFilterEnum.Linear);
      textureColor.setWrapCd(SamplerFilterEnum.ClampToEdge, SamplerFilterEnum.ClampToEdge);
      textureColor.update();
      this.outputTextures.set('color', textureColor);
      // 创建渲染目标
      var renderTarget: RenderTarget = this._renderTarget = context.createRenderTarget();
      renderTarget.optionDepth = true;
      renderTarget.size.set(1024, 1024);
      renderTarget.pushTexture(textureDepth);
      renderTarget.pushTexture(textureNormal);
      renderTarget.pushTexture(textureColor);
      renderTarget.build();
   }

   //==========================================================
   // <T>开始绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawBegin(region: Region): boolean {
      super.drawBegin(region);
      // 设置渲染目标
      var context = this._graphicContext;
      context.setRenderTarget(this._renderTarget);
      context.clearColorDepth(region.backgroundColor);
      return true;
   }
}