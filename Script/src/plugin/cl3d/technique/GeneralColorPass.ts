import {Region} from '../base/Region';
import {TechniquePass} from './TechniquePass';

//==========================================================
// <T>通用颜色渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
export class GeneralColorPass extends TechniquePass {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'color';
   }

   //==========================================================
   // <T>开始绘制处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawBegin(region: Region): boolean {
      super.drawBegin(region);
      // 设置渲染目标
      var context = this.graphicContext;
      context.clearColorDepth(region.backgroundColor);
      return true;
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @param region 区域
   //==========================================================
   public drawRegion(region: Region) {
      // 设置渲染目标
      var context = this.graphicContext;
      context.setRenderTarget(null);
      // 绘制处理
      super.drawRegion(region);
   }
}