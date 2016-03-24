import {ESamplerFilter} from '../../../runtime/graphic/base/ESamplerFilter';
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
   // 深度纹理
   public textureDepth: FTexture;
   // 法线纹理
   public textureNormal: FTexture;
   // 颜色纹理
   public textureColor: FTexture;
   // 渲染目标
   public renderTarget: RenderTarget;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
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
      var texture = this.textureDepth = context.createFlatTexture();
      texture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      texture.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      texture.update();
      // 创建法线纹理
      var texture = this.textureNormal = context.createFlatTexture();
      texture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      texture.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      texture.update();
      // 创建颜色纹理
      var texture = this.textureColor = context.createFlatTexture();
      texture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      texture.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      texture.update();
      // 创建渲染目标
      var renderTarget = this.renderTarget = context.createRenderTarget();
      renderTarget.size.set(2048, 2048);
      renderTarget.textures.push(texture);
      renderTarget.build();
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   public drawRegion(region: Region) {
      // 设置渲染目标
      var context = this._graphicContext;
      context.setRenderTarget(this.renderTarget);
      // 绘制处理
      super.drawRegion(region);
   }
}