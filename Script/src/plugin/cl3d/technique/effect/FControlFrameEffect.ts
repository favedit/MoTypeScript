import {ERegionParameter} from '../../engine/ERegionParameter';
import {FAutomaticEffect} from './FAutomaticEffect';

//==========================================================
// <T>控件页面渲染器。</T>
//
// @author maocy
// @history 150211
//==========================================================
export class FControlFrameEffect
   extends FAutomaticEffect {
   //==========================================================
   // <T>构造处理。</T>
   //==========================================================
   public constructor() {
      super();
      this.code = 'control.frame';
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param region 渲染区域
   // @param renderable 渲染对象
   //==========================================================
   public drawRenderable(region, renderable) {
      var c = this.graphicContext;
      var program = this.program;
      // 获得参数
      var vcp = region.calculate(ERegionParameter.CameraPosition);
      var vld = region.calculate(ERegionParameter.LightDirection);
      // 绑定材质
      var material = renderable.material();
      var materialInfo = material.info();
      this.bindMaterial(material);
      // 绑定所有属性流
      program.setParameter('vc_model_matrix', renderable.currentMatrix());
      program.setParameter('vc_vp_matrix', region.calculate(ERegionParameter.CameraViewProjectionMatrix));
      program.setParameter('vc_camera_position', vcp);
      program.setParameter('vc_light_direction', vld);
      program.setParameter('fc_camera_position', vcp);
      program.setParameter('fc_light_direction', vld);
      // 设置材质
      program.setParameter('fc_color', materialInfo.ambientColor);
      program.setParameter4('fc_vertex_color', materialInfo.colorMin, materialInfo.colorMax, materialInfo.colorRate, materialInfo.colorMerge);
      program.setParameter4('fc_alpha', materialInfo.alphaBase, materialInfo.alphaRate, materialInfo.alphaLevel, materialInfo.alphaMerge);
      program.setParameter('fc_ambient_color', materialInfo.ambientColor);
      program.setParameter('fc_diffuse_color', materialInfo.diffuseColor);
      program.setParameter('fc_specular_color', materialInfo.specularColor);
      program.setParameter4('fc_specular', materialInfo.specularBase, materialInfo.specularLevel, materialInfo.specularAverage, materialInfo.specularShadow);
      program.setParameter('fc_specular_view_color', materialInfo.specularViewColor);
      program.setParameter4('fc_specular_view', materialInfo.specularViewBase, materialInfo.specularViewRate, materialInfo.specularViewAverage, materialInfo.specularViewShadow);
      program.setParameter('fc_reflect_color', materialInfo.reflectColor);
      program.setParameter4('fc_reflect', 0, 0, 1.0 - materialInfo.reflectMerge, materialInfo.reflectMerge);
      program.setParameter('fc_emissive_color', materialInfo.emissiveColor);
      // 绑定所有属性流
      this.bindAttributes(renderable);
      // 绑定所有取样器
      this.bindSamplers(renderable);
      // 绘制处理
      c.drawTriangles(renderable.indexBuffer());
   }
}