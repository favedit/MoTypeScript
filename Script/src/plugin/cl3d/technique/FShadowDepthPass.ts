import {ESamplerFilter} from '../../../runtime/graphic/base/ESamplerFilter';
import {FTechniquePass} from './FTechniquePass';
import {FRegion} from '../base/FRegion';

//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class FShadowDepthPass extends FTechniquePass {
   // @attribute
   public textureDepth;
   public textureColor;
   public renderTarget;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'depth';
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   public setup() {
      super.setup();
      var context = this._graphicContext;
      context.enableDrawBuffers();
      // 创建平面
      var texture = this.textureDepth = context.createFlatTexture();
      texture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      texture.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      // 创建平面
      var texture = this.textureColor = context.createFlatTexture();
      texture.setFilterCd(ESamplerFilter.Linear, ESamplerFilter.Linear);
      texture.setWrapCd(ESamplerFilter.ClampToEdge, ESamplerFilter.ClampToEdge);
      // 创建渲染目标
      var renderTarget = this.renderTarget = context.createRenderTarget();
      renderTarget.optionDepth = true;
      renderTarget.size.set(2048, 2048);
      renderTarget.textures.push(this.textureDepth);
      renderTarget.textures.push(this.textureColor);
      renderTarget.build();
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region 区域
   //==========================================================
   public drawRegion(region: FRegion) {
      var context = this._graphicContext;
      // 设置渲染目标
      if (this.finish) {
         var color = region.backgroundColor;
         context.setRenderTarget(null);
         context.clear(color.red, color.green, color.blue, color.alpha, 1);
      } else {
         context.setRenderTarget(this.renderTarget);
         context.clear(0, 0, 0, 1, 1, 1);
      }
      // 绘制处理
      //region._textureDepth = this._textureDepth;
      super.drawRegion(region)
   }
}