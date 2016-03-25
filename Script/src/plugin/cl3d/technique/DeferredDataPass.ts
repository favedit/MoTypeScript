import {ESamplerFilter} from '../../../runtime/graphic/base/ESamplerFilter';
import {TextureFormatEnum} from '../../../runtime/graphic/material/TextureFormatEnum';
import {FTexture} from '../../../runtime/graphic/material/FTexture';
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
   public textureDepth: FTexture;
   // 法线纹理
   public textureNormal: FTexture;
   // 颜色纹理
   public textureColor: FTexture;

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
      var textureDepth:FTexture = this.textureDepth = context.createFlatTexture();
      textureDepth.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      textureDepth.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      textureDepth.formatCd = TextureFormatEnum.Float;
      textureDepth.update();
      // 创建法线纹理
      var textureNormal:FTexture = this.textureNormal = context.createFlatTexture();
      textureNormal.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      textureNormal.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      textureNormal.update();
      // 创建颜色纹理
      var textureColor:FTexture = this.textureColor = context.createFlatTexture();
      textureColor.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      textureColor.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      textureColor.update();
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