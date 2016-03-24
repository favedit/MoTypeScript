import {Region} from '../base/Region';
import {TechniquePass} from './TechniquePass';

//==========================================================
// <T>阴影颜色渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class ShadowColorPass extends TechniquePass {
   // @attribute
   public textureDepth;

   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'color';
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawRegion(region: Region) {
      var context = this._graphicContext;
      // 设置渲染目标
      var color = region.backgroundColor;
      context.setRenderTarget(null);
      context.clear(color.red, color.green, color.blue, color.alpha, 1);
      // 绘制处理
      super.drawRegion(region)
   }
}