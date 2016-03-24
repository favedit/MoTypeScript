import {RegionParameterEnum} from '../../base/RegionParameterEnum';
import {Renderable} from '../../base/Renderable';
import {Region} from '../../base/Region';
import {AutomaticEffect} from './AutomaticEffect';

//==========================================================
// <T>阴影深度自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
export class ShadowDepthAutomaticEffect extends AutomaticEffect {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'shadow.depth.automatic';
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @param region 渲染区域
   // @param renderable 渲染对象
   //==========================================================
   public drawRenderable(region: Region, renderable: Renderable) {
      var context = this._graphicContext;
      var program = this.program;
      // 获得参数
      var lvm = region.calculate(RegionParameterEnum.LightViewMatrix);
      var lvpm = region.calculate(RegionParameterEnum.LightViewProjectionMatrix);
      var lci = region.calculate(RegionParameterEnum.LightInfo);
      // 关闭混合选项
      context.setBlendFactors(false);
      // 绑定所有属性流
      program.setParameter('vc_camera', lci);
      program.setParameter('vc_model_matrix', renderable.currentMatrix);
      program.setParameter('vc_view_matrix', lvm);
      program.setParameter('vc_vp_matrix', lvpm);
      // 设置材质
      program.setParameter('fc_camera', lci);
      program.setParameter4('fc_alpha', 0, 0, 0, 0.1);
      // 绑定所有属性流
      this.bindAttributes(renderable);
      // 绑定所有取样器
      this.bindSamplers(renderable);
      // 绘制处理
      super.drawRenderable(region, renderable);
   }
}