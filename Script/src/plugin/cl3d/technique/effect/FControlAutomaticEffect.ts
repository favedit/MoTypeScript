import {ERegionParameter} from '../../engine/ERegionParameter';
import {FAutomaticEffect} from './FAutomaticEffect';

//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 150211
//==========================================================
export class FControlAutomaticEffect extends FAutomaticEffect {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'control.automatic';
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param region:FG3dRegion 渲染区域
   // @param renderable:FG3dRenderable 渲染对象
   //==========================================================
   public drawRenderable(region, renderable) {
      var context = this.graphicContext;
      var program = this.program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(ERegionParameter.CameraViewProjectionMatrix);
      // 绑定材质
      var material = renderable.material();
      var info = material.info();
      this.bindMaterial(material);
      // 绑定所有属性流
      program.setParameter('vc_model_matrix', matrix);
      program.setParameter('vc_vp_matrix', cameraVpMatrix);
      // 设置材质
      program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
      program.setParameter('fc_ambient_color', info.ambientColor);
      // 绑定所有属性流
      this.bindAttributes(renderable);
      // 绑定所有取样器
      this.bindSamplers(renderable);
      // 绘制处理
      var indexBuffer = renderable.indexBuffers().first();
      context.drawTriangles(indexBuffer);
   }
}